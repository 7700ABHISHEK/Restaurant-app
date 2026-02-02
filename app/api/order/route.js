import connectDB from "@/app/lib/config/db";
import { Order } from "@/app/lib/model/Order";
import DeliveryPartner from "@/app/lib/model/DeliveryPartner";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();
        await connectDB();
        let success = false;
        
        const orderObj = new Order(payload);
        const result = await orderObj.save();
        
        if (result && payload.deliveryPartner_id) {
            // Update delivery partner's current orders count
            await DeliveryPartner.findByIdAndUpdate(
                payload.deliveryPartner_id,
                { $inc: { currentOrders: 1 } }
            );
            success = true;
        }
        
        return NextResponse.json({ result, success })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }
}