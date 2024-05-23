"use client";
import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DeleteBT from "./components/DeleteBT";
function UserPage() {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  if (!session?.user?.role === "admin") redirect("/welcome");

  const [usersAll, setUsersAll] = useState();

  const getUsersAll = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users-all", {
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
      console.log(resData.users);
      setUsersAll(resData.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersAll();
  }, []);

  return (
    <Container>
      <AdminNav session={session} />
      <div className="flex-grow">
        <div className="container mx-auto">
          <div className="flex  mt-10">
            <SideNav />
            <div className="p-10">
              <h3 className="text-3xl mb-3">Manage Users</h3>
              <p>list users form MongoDB database</p>
              <div className="shadow-lg overflow-x-auto">
                <table className="w-full text-left rounded-md mt-3 table-fixed">
                  <thead>
                    <tr className="bg-gray-300 ">
                      <th className="p-5">UserId</th>
                      <th className="p-5">Username</th>
                      <th className="p-5">Email</th>
                      <th className="p-5">Password</th>
                      <th className="p-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersAll?.map((val) => (
                      <tr key={val.email}>
                        <td className="p-5">{val._id}</td>
                        <td className="p-5">{val.name}</td>
                        <td className="p-5">{val.email}</td>
                        <td className="p-5">{val.role}</td>
                        <td className="p-5">
                          <Link
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                            href={`/admin/users/edit/${val._id}`}
                          >
                            Edit
                          </Link>
                          <DeleteBT id={val._id} />
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

export default UserPage;
