import connectDB from "@/app/lib/config/db";
import DeliveryPartner from "@/app/lib/model/DeliveryPartner";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        
        // Find an available delivery partner with the least current orders
        const availablePartner = await DeliveryPartner.findOne({ 
            isAvailable: true 
        }).sort({ currentOrders: 1 });

        if (!availablePartner) {
            return NextResponse.json({ 
                success: false, 
                error: "No delivery partners available" 
            }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            deliveryPartnerId: availablePartner._id 
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
