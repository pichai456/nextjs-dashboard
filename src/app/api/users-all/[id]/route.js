import { connectMongoDB } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";
export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findById({ _id: id });
    console.log("user : ", user);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
export async function PUT(req, { params }) {
  try {
    console.log("test update");
    const { id } = params;
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    await connectMongoDB();
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
    console.log("user update : ", user);
    return NextResponse.json({ user }, { massage: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
