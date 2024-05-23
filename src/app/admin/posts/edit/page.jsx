import React from "react";
import Container from "../../components/Container";
import AdminNav from "../../components/AdminNav";
import Footer from "../../components/Footer";
import SideNav from "../../components/SideNav";
import Link from "next/link";
function AdminEditPostPage() {
  return (
    <Container>
      <AdminNav />
      <div className="flex-grow">
        <div className="container shadow-md rounded-md mx-auto my-10 p-10">
          <Link
            href="/admin/posts"
            className="bg-gray-500 text-white rounded-md px-4 py-2 inline-block"
          >
            Go Back
          </Link>
          <hr className="my-3" />
          <h3 className="text-xl">Admin Edit Post</h3>
          <form action="">
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder="Post Title"
              value="Title befor update"
            />
            <input
              type="text"
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              placeholder="Post Image"
              value="https://imgurl.com/img"
            />
            <textarea
              name=""
              id=""
              className="bg-gray-200 rounded-md w-[300px] block border py-2 px-4 text-xl my-3"
              color="30"
              rows="10"
              placeholder="Enter your post content"
              value="Content befor update"
            ></textarea>

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

export default AdminEditPostPage;
