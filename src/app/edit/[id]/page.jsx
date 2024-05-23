"use client";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
function EditPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) redirect("/login");

  const { id } = params;

  const [postData, setPostData] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const getPostById = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );
      if (res.error) {
        throw Error("Failed to get posts");
      }
      const data = await res.json();
      console.log(data.post);
      setPostData(data.post);
      setNewTitle(data.post.title);
      setNewImg(data.post.img);
      setNewContent(data.post.content);
    } catch (error) {
      console.log(error);
    }
  };
  const putPost = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/posts/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newTitle,
            img: newImg,
            content: newContent,
          }),
        }
      );
      if (res.error) {
        throw Error("Failed to get posts");
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await putPost(id);
    if (data) {
      router.refresh();
      router.push("/welcome");
    }
  };

  useEffect(() => {
    getPostById(id);
  }, []);

  return (
    <Container>
      <Navbar session={session} />
      <div className="flex-grow">
        <div className="container shadow-md rounded-md mx-auto my-10 p-10">
          <Link
            href="/welcome"
            className="bg-gray-500 text-white rounded-md px-4 py-2 inline-block"
          >
            Go Back
          </Link>
          <hr className="my-3" />
          <h3 className="text-xl">Edit Post</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={postData?.title}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={postData?.img}
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
            />
            <textarea
              name=""
              id=""
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              color="30"
              rows="10"
              placeholder={postData?.content}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            ></textarea>

            <button
              className="bg-green-500 rounded-md px-4 py-2 inline-block text-white text-xl"
              type="submit"
              name="update"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default EditPage;
