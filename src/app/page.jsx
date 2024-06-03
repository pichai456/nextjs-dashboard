"use client";
import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Vercel from "../../public/vercel.svg";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="">
      <Container>
        <Navbar session={session} />
        <div className="grow text-center p-10">
          <div className="my-4">
            <h1 className="text-5xl ">NextJs DashBoard</h1>
            <p>Become full-stack developer with NextJs </p>
          </div>

          <h1 className="text-5xl my-4">Manage Post DashBoard</h1>
          <div className="flex justify-center my-10">
            <Image src={Vercel} width={300} height={0} alt="vercel logo" />
          </div>
        </div>
        <Footer />
      </Container>
    </main>
  );
}
