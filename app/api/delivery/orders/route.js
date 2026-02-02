import connectDB from "@/app/lib/config/db";
import { Order } from "@/app/lib/model/Order";
import DeliveryPartner from "@/app/lib/model/DeliveryPartner";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const deliveryPartnerId = searchParams.get('deliveryPartnerId');
        
        await connectDB();

        if (deliveryPartnerId) {
            // Get orders assigned to this delivery partner
            const orders = await Order.find({ 
                deliveryPartner_id: deliveryPartnerId,
                status: { $in: ['confirm', 'preparing', 'picked_up'] }
            })
            .populate('customer_id', 'name phone address')
            .populate('restaurant_id', 'name address')
            .sort({ createdAt: -1 });

            return NextResponse.json({ success: true, orders });
        } else {
            // Get all available orders (not yet assigned or ready for pickup)
            const availableOrders = await Order.find({ 
                status: { $in: ['confirm', 'preparing'] }
            })
            .populate('customer_id', 'name phone address')
            .populate('restaurant_id', 'name address')
            .sort({ createdAt: -1 });

            return NextResponse.json({ success: true, orders: availableOrders });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json();
        const { orderId, status, deliveryPartnerId } = payload;
        
        await connectDB();

        // Update order with status and delivery partner if accepting
        const updateData = { status };
        if (status === 'picked_up' && deliveryPartnerId) {
            updateData.deliveryPartner_id = deliveryPartnerId;
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            updateData,
            { new: true }
        );

        // Update delivery partner stats based on status
        if (deliveryPartnerId) {
            if (status === 'picked_up') {
                // Increment current orders when accepting
                await DeliveryPartner.findByIdAndUpdate(
                    deliveryPartnerId,
                    { 
                        $inc: { currentOrders: 1 }
                    }
                );
            } else if (status === 'delivered') {
                // Decrement current orders and increment total deliveries when delivered
                await DeliveryPartner.findByIdAndUpdate(
                    deliveryPartnerId,
                    { 
                        $inc: { 
                            currentOrders: -1,
                            totalDeliveries: 1
                        }
                    }
                );
            }
        }

        return NextResponse.json({ success: true, order });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
