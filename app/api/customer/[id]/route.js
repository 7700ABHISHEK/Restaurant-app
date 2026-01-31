import connectDB from "@/app/lib/config/db";
import { Food } from "@/app/lib/model/Food";
import { User } from "@/app/lib/model/User";
import { NextResponse } from "next/server";

export async function GET(request, context){
    let {id} = await context.params;
    let success = false;
    await connectDB();
    const details = await User.findOne({_id: id});
    const foodItems = await Food.find({userId : id})

    if(details && foodItems){
        success = true;
    }

    return NextResponse.json({success, details, foodItems})
}