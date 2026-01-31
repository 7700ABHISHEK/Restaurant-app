import connectDB from "@/app/lib/config/db";
import { User } from "@/app/lib/model/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        let success = false;
        let result = await User.find({})
        result = result.map((item) =>
            item.city.charAt(0).toUpperCase() + item.city.slice(1)
        );
        result = [...new Set(result)]

        if (result) {
            success = true;
        }
        return NextResponse.json({ result, success })
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message, success: false}, {status: 500})
    }
}