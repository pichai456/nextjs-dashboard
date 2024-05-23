"use client";
import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DeleteBT from "./components/DeleteBT";
function AdminPostsPage() {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  if (session?.user?.role !== "admin") redirect("/welcome");

  const [postsData, setPostsData] = useState([]);
  console.log(postsData);
  const getPostsData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error("Failed to get posts");
      }

      const data = await res.json();
      setPostsData(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);
  return (
    <Container>
      <AdminNav session={session} />
      <div className="flex-grow">
        <div className="container mx-auto">
          <div className="flex  mt-10">
            <SideNav />
            <div className="p-10">
              <h3 className="text-3xl mb-3">Manage Posts</h3>
              <p>list post form MongoDB database</p>
              <div className="shadow-lg overflow-x-auto">
                <table className="w-full text-left rounded-md mt-3 table-fixed">
                  <thead>
                    <tr className="bg-gray-300 ">
                      <th className="p-5">PostId</th>
                      <th className="p-5">Post Title</th>
                      <th className="p-5">Post Image</th>
                      <th className="p-5">Post Content</th>
                      <th className="p-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {postsData.map((post) => (
                      <tr key={post._id}>
                        <td className="p-5">{post._id}</td>
                        <td className="p-5">{post.title}</td>
                        <td className="p-5">
                          <Image
                            className="rounded-md my-3"
                            src={post.img}
                            width={100}
                            height={100}
                            alt="image post"
                          />
                        </td>
                        <td className="p-5">{post.content}</td>
                        <td className="p-5">
                          <Link
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            href={`/admin/posts/edit/${post._id}`}
                          >
                            Edit
                          </Link>
                          <DeleteBT id={post._id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default AdminPostsPage;
