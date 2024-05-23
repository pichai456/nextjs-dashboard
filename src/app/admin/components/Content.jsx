import React from "react";
import { FaUsers, FaRegNewspaper } from "react-icons/fa6";
import Image from "next/image";
function Content({ totalUser, totalPosts }) {
  return (
    <div className="rounded-lg px-10">
      <div className="flex">
        <div className="shadow-lg w-[300px] m-3 p-10 rounded-lg">
          <h3 className="flex items-center">
            <FaUsers className="mr-2" /> Total Users
          </h3>
          <p className="text-5xl">{totalUser}</p>
        </div>
        <div className="shadow-lg w-[300px] m-3 p-10 rounded-lg">
          <h3 className="flex items-center">
            <FaRegNewspaper className="mr-2" /> Total Posts
          </h3>
          <p className="text-5xl">{totalPosts}</p>
        </div>
        {/* <div className="shadow-lg w-[300px] m-3 p-10 rounded-lg">
          <h3 className="flex items-center">
            <FaRegNewspaper className="mr-2" /> Popular Posts
          </h3>
          <Image
            className="rounded-md my-3"
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kaW5nfGVufDB8fDB8fHww"
            width={300}
            height={100}
            alt="image post"
          />
        </div> */}
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum in rem
        vitae assumenda illum hic aliquam praesentium earum pariatur,
        reprehenderit sit facere, sed, expedita vero dolorum nobis delectus a
        et.
      </p>
    </div>
  );
}

export default Content;
