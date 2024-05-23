"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Container from "../components/Container";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();

  if (session) redirect("/welcome");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setError("Please confirm your password");
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      setError("Please conplete all the fields");
      return;
    }
    const userExists = await postUserExists();
    console.log("userExists", userExists);
    if (userExists) {
      setError("User already exists.");
      return;
    }
    console.log("regis");
    const res = await postRegister();
    if (res) {
      setError("");
      const form = e.target;
      form.reset();
      setSuccess("User registered successfully.");
      router.replace("/login");
    }
  };

  const postUserExists = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (!res.ok) {
        return;
      }
      const user = await res.json();
      return user.user;
    } catch (error) {
      console.log("Error during registration: " + error);
    }
  };

  const postRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      if (res.ok) {
        console.log("User registered successfully");
        return res;
      } else {
        console.log("User registration failed");
        return;
      }
    } catch (error) {
      console.log("Error during registration: " + error);
    }
  };
  return (
    <Container>
      <Navbar />
      <div className="grow">
        <div className="flex justify-center items-center">
          <div className="w-[400px] shadow-xl rounded-xl p-10 mt-5">
            <h2 className="text-3xl">Register</h2>
            <hr className="mt-3" />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-lg border my-2"
                placeholder="Enter your name"
              />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-lg border my-2"
                placeholder="Enter your Email"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-lg border my-2"
                placeholder="Enter your password"
              />
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-200 rounded-md px-3 py-2 text-lg border my-2"
                placeholder="Conform your password"
              />
              {error && (
                <div className="text-white bg-red-600 rounded-md w-fit px-3 py-2 my-15">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-white bg-green-600 rounded-md w-fit px-3 py-2 my-15">
                  {success}
                </div>
              )}
              <button
                type="submit"
                className="bg-green-500 rounded-md text-white px-3 py-2 border text-lg my-2"
              >
                SignUp
              </button>
              <hr className="mt-3" />
              <p className="my-2">
                Aready have an account? Go go{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login
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

export default Register;
