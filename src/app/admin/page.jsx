"use client";
import React, { useEffect, useState } from "react";
import Container from "./components/Container";
import AdminNav from "./components/AdminNav";
import Footer from "./components/Footer";
import SideNav from "./components/SideNav";
import Content from "./components/Content";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
function AdminPage() {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  if (session?.user?.role !== "admin") redirect("/welcome");

  const [totalUsers, setTotalUsers] = useState();
  const [totalPosts, setTotalPosts] = useState();

  const getUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      if (res.error) {
        throw Error("Failed to get users");
      }
      const resData = await res.json();
      console.log(resData);
      setTotalUsers(resData.total);
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts-all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      if (res.error) {
        throw Error("Failed to get users");
      }
      const resData = await res.json();
      console.log(resData);
      setTotalPosts(resData.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);
  return (
    <Container>
      <AdminNav session={session} />
      <div className="grow">
        <div className="container mx-auto">
          <div className="flex justify-between mt-10">
            <SideNav />
            <Content totalUser={totalUsers} totalPosts={totalPosts} />
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default AdminPage;
