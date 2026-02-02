import connectDB from "@/app/lib/config/db";
import Customer from "@/app/lib/model/Customer";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const payload = await request.json();
        let success = false;
        await connectDB()
        const hashPassword = await bcrypt.hash(payload.password, 10);
        const customer = new Customer({
            ...payload, password: hashPassword
        })
        let result = await customer.save();
        if (result) {
            success = true;
        }
        return NextResponse.json({ result, success })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }
}