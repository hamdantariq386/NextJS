import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://hamdan:hj641870@cluster0.2hxfc.mongodb.net/todo-app');
    console.log("Connected to MongoDB");
}