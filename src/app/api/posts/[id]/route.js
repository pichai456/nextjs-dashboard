import { connectMongoDB } from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import Post from "../../../../../models/post";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 }, { massage: "success" });
  } catch (error) {
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, img, content } = await req.json();
    await connectMongoDB();
    await Post.findOneAndUpdate(
      { _id: id },
      {
        title,
        img,
        content,
      }
    );
    return NextResponse.json({ status: 200 }, { massage: "success" });
  } catch (error) {
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
