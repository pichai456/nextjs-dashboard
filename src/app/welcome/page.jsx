"use client";
import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DeleteBT from "./components/DeleteBT";
function WelcomePage() {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  console.log(session.user);
  if (session?.user?.role === "admin") redirect("/admin");

  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userEmail = session?.user?.email;

  const getPostData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/posts?email=${userEmail}`,
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
      setPostData(data.posts);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <Container>
      <Navbar session={session} />
      <div className="grow">
        <div className="container mx-auto shadow-md rounded-xl my-10 p-10">
          <div className="flex justify-between">
            <div>
              <h3 className="text-3xl">Profile</h3>
              <p>Welcome, {session?.user.name}</p>
              <p>Email: {session?.user.email}</p>
            </div>
            <div>
              <Link
                href="/create"
                className="bg-green-500 shadow-md rounded-md px-4 py-2 text-white"
              >
                Create Post
              </Link>
            </div>
          </div>
          {/* user post data */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div>
                {postData && postData.length > 0 ? (
                  postData.map((post) => (
                    <div
                      key={post._id}
                      className="rounded-md my-10 p-10 shadow-xl"
                    >
                      <h4 className="text-4xl">{post.title}</h4>
                      <Image
                        className="rounded-md my-3"
                        src={post.img}
                        width={300}
                        height={0}
                        alt={post.img}
                      />
                      <p>{post.content}</p>
                      <div className="mt-5">
                        <Link
                          href={`/edit/${post._id}`}
                          className="rounded-md bg-gray-500 text-white px-4 py-2 text-lg mx-2 "
                        >
                          Edit
                        </Link>
                        <DeleteBT id={post._id} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Not Infomation Post</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default WelcomePage;
