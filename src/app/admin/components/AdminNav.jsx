import React from "react";
import Link from "next/link";
import Logo from "../../../../public/next.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";

function AdminNav({ session }) {
  return (
    <nav className="shadow-xl bg-gradient-to-r  from-violet-500 to-fuchsia-500">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-7">
          <div>
            <Link href="/">
              <h2 className="text-3xl">Pichai DashBoard</h2>
              {/* <Image src={Logo} width={100} height={100} alt="logo" /> */}
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
                <a
                  onClick={() => signOut()}
                  className="bg-red-600 text-white text-lg rounded-md  my-2 py-2 px-3 hover:text-slate-300"
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

export default AdminNav;
