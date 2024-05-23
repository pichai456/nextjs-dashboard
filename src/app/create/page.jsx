"use client";

import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
function CreatePage() {
  const router = useRouter();

  const { data: session } = useSession();
  if (!session) redirect("/login");

  const userEmail = session?.user?.email;

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !img || !content) {
      alert("Please complete all inputs.");
    }
    try {
      const res = await apiCreatePost();
      if (res.ok) {
        router.push("/welcome");
      } else {
        throw Error("Failed to create post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const apiCreatePost = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        img,
        content,
        userEmail,
      }),
    });
    return res;
  };
  return (
    <Container>
      <Navbar session={session} />
      <div className="grow">
        <div className="container shadow-md rounded-md mx-auto my-10 p-10">
          <Link
            href="/welcome"
            className="bg-gray-500 text-white rounded-md px-4 py-2 inline-block"
          >
            Go Back
          </Link>
          <hr className="my-3" />
          <h3 className="text-xl">Create Post</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder="Post Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder="Post Image"
              onChange={(e) => setImg(e.target.value)}
            />
            <textarea
              name=""
              id=""
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              color="30"
              rows="10"
              placeholder="Enter your post content"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <button
              className="bg-green-500 rounded-md px-4 py-2 inline-block text-white text-xl"
              type="submit"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default CreatePage;
