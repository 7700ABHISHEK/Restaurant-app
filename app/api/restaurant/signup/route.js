import { User } from "@/app/lib/model/User";
import connectDB from "@/app/lib/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST (request){
    try {
        await connectDB();
        const payload = await request.json();

        const hashedPassword = await bcrypt.hash(payload.password, 10);

        const newUser = new User({
            ...payload, password: hashedPassword
        })

        await newUser.save();

        return NextResponse.json({result: true, Response: newUser})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ result: false, error: error.message }, { status: 500 });
    }
}