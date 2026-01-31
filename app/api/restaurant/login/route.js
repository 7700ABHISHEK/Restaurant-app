import connectDB from "@/app/lib/config/db"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { User } from "@/app/lib/model/User";

export async function POST(request){
    try {
        await connectDB();
        const payload = await request.json();
        const email = payload.email;
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({result: false, error: "User not found"}, {status: 404})
        }

        const password = await bcrypt.compare(payload.password, user.password);

        if(!password) {
            return NextResponse.json({result: false, error: "Invalid password"}, {status: 401})
        }

        return NextResponse.json({result: true, Response: user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({result: false, error: error.message}, {status: 500})
    }
}   