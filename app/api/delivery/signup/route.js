import connectDB from "@/app/lib/config/db";
import DeliveryPartner from "@/app/lib/model/DeliveryPartner";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const payload = await request.json();
        let success = false;
        
        await connectDB();
        
        const existingPartner = await DeliveryPartner.findOne({ email: payload.email });
        if (existingPartner) {
            return NextResponse.json({ success: false, error: "Email already registered" }, { status: 400 });
        }

        const hashPassword = await bcrypt.hash(payload.password, 10);
        const deliveryPartner = new DeliveryPartner({
            ...payload, 
            password: hashPassword
        });
        
        let result = await deliveryPartner.save();
        if (result) {
            success = true;
        }
        
        return NextResponse.json({ result, success });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
