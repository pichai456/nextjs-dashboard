import React from "react";
import Link from "next/link";
function SideNav() {
  return (
    <nav className="rounded-md shadow-md p-10">
      <ul>
        <li>
          <Link
            href="/admin"
            className="block my-3 p-3 rounded-md hover:underline"
          >
            DashBoard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className="block my-3 p-3 rounded-md hover:underline"
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            href="/admin/posts"
            className="block my-3 p-3 rounded-md hover:underline"
          >
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;
