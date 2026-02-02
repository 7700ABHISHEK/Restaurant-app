import connectDB from "@/app/lib/config/db";
import { Food } from "@/app/lib/model/Food";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const { searchParams } = new URL(request.url);
        const foodItemIds = searchParams.get('foodItemIds');
        
        if (!foodItemIds) {
            return NextResponse.json({ success: false, error: "Food item IDs are required" });
        }

        await connectDB();
        
        // Split the comma-separated IDs and fetch food items
        const idsArray = foodItemIds.split(',');
        const foodItems = await Food.find({ _id: { $in: idsArray } });
        
        return NextResponse.json({ success: true, result: foodItems });
    } catch (error) {
        console.error("Error fetching food items:", error);
        return NextResponse.json({ success: false, error: error.message });
    }
}