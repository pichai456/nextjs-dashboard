"use client";
import React, { useState, useEffect } from "react";
import Container from "../../../components/Container";
import AdminNav from "../../../components/AdminNav";
import Footer from "../../../components/Footer";
import SideNav from "../../../components/SideNav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
function AdminEditPostPage({ params }) {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("/welcome");

  const { id } = params;
  const router = useRouter();

  const [postOld, setPostOld] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");

  const getPostById = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/posts-all/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to get post");
      }
      const data = await res.json();
      setPostOld(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const putPostById = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/posts-all/${id}`,
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
          cache: "no-cache",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update post");
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await putPostById(id);
    console.log(success);
    if (success) {
      router.refresh();
      router.push("/admin/posts");
    }
  };

  useEffect(() => {
    getPostById(id);
  }, []);

  return (
    <Container>
      <AdminNav session={session} />
      <div className="flex-grow">
        <div className="container shadow-md rounded-md mx-auto my-10 p-10">
          <Link
            href="/admin/posts"
            className="bg-gray-500 text-white rounded-md px-4 py-2 inline-block"
          >
            Go Back
          </Link>
          <hr className="my-3" />
          <h3 className="text-xl">Admin Edit Post</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={postOld?.title}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={postOld?.img}
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
            />
            <textarea
              name=""
              id=""
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              color="30"
              rows="10"
              placeholder={postOld?.content}
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

export default AdminEditPostPage;
