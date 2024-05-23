"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Container from "../components/Container";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();

  if (session) router.replace("/welcome");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }
      console.log("SignIn success", res);

      router.replace("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Navbar />
      <div className="grow">
        <div className="flex justify-center items-center">
          <div className="w-[400px] shadow-xl rounded-xl p-10 mt-5">
            <h2 className="text-3xl">Login</h2>
            <hr className="mt-3" />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-lg border my-2"
                placeholder="Enter your name"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-lg border my-2"
                placeholder="Enter your password"
              />
              {error && (
                <div className="text-white bg-red-600 rounded-md w-fit px-3 py-2 my-15">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="bg-green-500 rounded-md text-white px-3 py-2 border text-lg my-2"
              >
                SignIn
              </button>
              <hr className="mt-3" />
              <p className="my-2">
                Do not have an account? Go go
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </Link>
                Page
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </Container>
  );
}

export default LoginPage;
