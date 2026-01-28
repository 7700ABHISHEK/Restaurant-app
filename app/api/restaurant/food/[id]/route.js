import connectDB from "@/app/lib/config/db";
import { Food } from "@/app/lib/model/Food";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    try {
        const { id } = await context.params
        let success = false;
        await connectDB();
        const result = await Food.find({ userId: id })
        if (result) {
            success = true;
        }
        return NextResponse.json({ result, success })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

export async function DELETE(request, context) {
    try {
        const { id } = await context.params
        let success = false;
        await connectDB();
        const result = await Food.findByIdAndDelete({ _id: id });
        if(result){
            success = true;
        }
        return NextResponse.json({ success, result })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, error:error.message}, {status: 500})
    }
}