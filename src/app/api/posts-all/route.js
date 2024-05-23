import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const posts = await Post.find();
    const total = posts.length;
    return NextResponse.json(
      { posts, total },
      { status: 200 },
      { massage: "success" }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
