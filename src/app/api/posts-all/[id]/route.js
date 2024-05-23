import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";
export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const data = await Post.findOne({ _id: id });
    return NextResponse.json({ data }, { massage: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, img, content } = await req.json();
    await connectMongoDB();
    const data = await Post.findByIdAndUpdate(id, {
      title,
      img,
      content,
    });
    return NextResponse.json({ data }, { massage: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
