import React from "react";
import Link from "next/link";
import Logo from "../../../public/next.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";
function Navbar({ session }) {
  return (
    <nav className="shadow-xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-7">
          <div className="">
            <Link href="/">
              {/* <Image src={Logo} alt="logo" width={100} height={100} /> */}
              <h3 className="text-3xl font-bold text-white">DashBoard</h3>
            </Link>
          </div>
          <ul className="flex">
            {!session ? (
              <>
                <li className="mx-3 hover:underline">
                  <Link href={"/login"}>Login</Link>
                </li>
                <li className="mx-3 hover:underline">
                  <Link href={"/register"}>Register</Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href={"/welcome"}
                  className="bg-blue-400 text-white text-lg rounded-md  my-2 py-2 px-3 mx-2 hover:shadow-2xl hover:border"
                >
                  Profile
                </Link>
                <a
                  onClick={() => signOut()}
                  className="bg-red-600 text-white text-lg rounded-md  my-2 py-2 px-3 hover:shadow-2xl hover:border"
                >
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
