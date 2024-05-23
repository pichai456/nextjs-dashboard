import React from "react";
import Link from "next/link";
import Logo from "../../../public/next.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";
function Navbar({ session }) {
  return (
    <nav className="shadow-xl ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-7">
          <div className="">
            <Link href="/">
              <Image src={Logo} alt="logo" width={100} height={100} />
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
                  className="bg-gray-300 text-white text-lg rounded-md border my-2 py-2 px-3 mx-2"
                >
                  Profile
                </Link>
                <a
                  onClick={() => signOut()}
                  className="bg-red-600 text-white text-lg rounded-md border my-2 py-2 px-3 "
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
