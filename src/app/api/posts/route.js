import { connectMongoDB } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import Post from "../../../../models/post";

export async function POST(request) {
  const { title, img, content, userEmail } = await request.json();
  try {
    const client = await connectMongoDB();
    await Post.create({ title, img, content, userEmail });
    return NextResponse.json({ massage: "success" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const userEmail = request.nextUrl.searchParams.get("email");
    await connectMongoDB();
    const posts = await Post.find({ userEmail });
    return NextResponse.json(
      { posts },
      { status: 200 },
      { massage: "success" }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const res = await Post.findByIdAndDelete(id);
    return NextResponse.json({ massage: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ massage: "failed" }, { status: 500 });
  }
}
