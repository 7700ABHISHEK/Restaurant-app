import connectDB from "@/app/lib/config/db";
import { Food } from "@/app/lib/model/Food";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const payload = await request.json();
        let result = false;
        const food = new Food(payload);
        await food.save();
        if (food) {
            result = true
        }
        return NextResponse.json({ result, Response: food })
    } catch (error) {
        console.log(error)
        NextResponse.json({success: false, error:error.message}, {status: 500})
    }
}