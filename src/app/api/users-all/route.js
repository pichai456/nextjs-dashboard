import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();
    const total = users.length;
    return NextResponse.json(
      { users, total },
      { status: 200 },
      { massage: "success" }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ massage: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
