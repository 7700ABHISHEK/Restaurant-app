import connectDB from "@/app/lib/config/db";
import Customer from "@/app/lib/model/Customer";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const payload = await request.json();
        const email = payload.email
        await connectDB();
        let result = await Customer.findOne({email})

        if(!result){
            return NextResponse.json({ success: false }, { status: 500 })
        }

        const password = await bcrypt.compare(payload.password, result.password);

        if (!password) {
            alert("Please Enter Correct Password...");
            return NextResponse.json({ success: false }, { status: 500 })
        }

        return NextResponse.json({ result, success: true })

    } catch (error) {
        console.log(error);
        return NextResponse.json({success: false, error: error.message}, {status: 500})
    }
}