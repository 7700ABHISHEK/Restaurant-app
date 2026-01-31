import connectDB from "@/app/lib/config/db";
import { User } from "@/app/lib/model/User";
import { NextResponse } from "next/server"

export async function GET(request) {
    let queryParams = await request.nextUrl.searchParams;
    let filter = {};
    let success = false;
    if (queryParams.get("location")) {
        let city = queryParams.get("location");
        filter = { city: { $regex: RegExp(city, 'i') } };
    }
    if (queryParams.get("restaurant")) {
        let name = queryParams.get("restaurant");
        filter = { name: { $regex: RegExp(name, 'i') } }
    }
    await connectDB();
    let result = await User.find(filter);

    if(result){
        success = true;
    }

    return NextResponse.json({ success, result })
}