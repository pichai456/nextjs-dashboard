"use client";
import React, { useState, useEffect } from "react";
import Container from "../../../components/Container";
import AdminNav from "../../../components/AdminNav";
import Footer from "../../../components/Footer";
import SideNav from "../../../components/SideNav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
function AdminEditUserPage({ params }) {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("/welcome");
  const { id } = params;
  const router = useRouter();

  const [userOld, setUserOld] = useState();
  const [newUserName, setUserNew] = useState("");
  const [newUserEmail, setUserEmail] = useState("");
  const [newUserPassword, setUserPassword] = useState("");

  const getUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users-all/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
      if (!res.ok) {
        throw new Error("Failed to get users");
      }
      const resData = await res.json();
      setUserOld(resData.user);
    } catch (error) {
      console.log(error);
    }
  };

  const putUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users-all/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update users");
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await putUser(id);
    if (data) {
      router.refresh();
      router.push("/admin/users");
    }
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <Container>
      <AdminNav />
      <div className="flex-grow">
        <div className="container shadow-md rounded-md mx-auto my-10 p-10">
          <Link
            href="/admin/users"
            className="bg-gray-500 text-white rounded-md px-4 py-2 inline-block"
          >
            Go Back
          </Link>
          <hr className="my-3" />
          <h3 className="text-xl">Admin Edit User</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={userOld?.name}
              value={newUserName}
              onChange={(e) => setUserNew(e.target.value)}
            />
            <input
              type="email"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={userOld?.email}
              value={newUserEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              type="password"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder={userOld?.password}
              value={newUserPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

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

export default AdminEditUserPage;
