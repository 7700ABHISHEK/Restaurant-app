import connectDB from "@/app/lib/config/db";
import DeliveryPartner from "@/app/lib/model/DeliveryPartner";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const payload = await request.json();
        const email = payload.email;
        
        await connectDB();
        let result = await DeliveryPartner.findOne({ email });

        if (!result) {
            return NextResponse.json({ success: false, error: "Delivery partner not found" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare(payload.password, result.password);

        if (!passwordMatch) {
            return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ result, success: true });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
