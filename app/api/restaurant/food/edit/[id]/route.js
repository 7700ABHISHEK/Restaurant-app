import connectDB from "@/app/lib/config/db";
import { Food } from "@/app/lib/model/Food";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    try {
        const { id } = await context.params;
        let success = false
        await connectDB();
        let result = await Food.findOne({ _id: id })
        
        if(!result){
            return NextResponse.json({
                success: false,
                error: "Food item not found"
            }, {status: 400});
        }
        
        if (result) {
            success = true;
        }
        return NextResponse.json({ result, success })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function PATCH(request, context) {
    try {
        const { id } = await context.params;
        await connectDB();
        const payload = await request.json()
        let success = false;
        let result = await Food.findByIdAndUpdate({ _id: id }, payload)

        if(!result) {
            return NextResponse.json({
                success : false,
                error: "Invalid Id...",
            }, {status: 400})
        }

        if (result) {
            success = true;
        }
        return NextResponse.json({ success, result })
    } catch (error) {
        console.log(error);
        NextResponse.json({success: false, error: error.message}, {status:500})
    }
}