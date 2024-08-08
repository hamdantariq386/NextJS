import { ConnectDB } from "@/lib/config/db";
import TodoModel from "../../lib/config/models/TodoModel"
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await ConnectDB();
} 

LoadDB();

export async function GET(request) {
    // todos added from database
    
    const todos = await TodoModel.find({});
    
    //todos send to frontend
    
    return NextResponse.json({todos:todos})
}

export async function POST(request) {

    //sending input data from frontend to database
    
    const {title, description} = await request.json();

    await TodoModel.create({
        title,
        description,
    })

    return NextResponse.json({msg:"Todo Created"})
}

export async function DELETE(request) {

    //get id from frontend and store in this variable
    
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndDelete(mongoId)

    return NextResponse.json({msg:"Todo Deleted"})
}

export async function PUT(request) {
    
    const mongoId = await request.nextUrl.searchParams.get('mongoId');
    await TodoModel.findByIdAndUpdate(mongoId, {
        $set:{
            isCompleted: true
        }
    })

    return NextResponse.json({msg:"Todo Completed"})
}
