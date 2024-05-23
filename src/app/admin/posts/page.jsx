import React from "react";
import Container from "../components/Container";
import AdminNav from "../components/AdminNav";
import Footer from "../components/Footer";
import SideNav from "../components/SideNav";
import Link from "next/link";
import Image from "next/image";
function PostsPage() {
  return (
    <Container>
      <AdminNav />
      <div className="flex-grow">
        <div className="container mx-auto">
          <div className="flex  mt-10">
            <SideNav />
            <div className="p-10">
              <h3 className="text-3xl mb-3">Manage Posts</h3>
              <p>list post form MongoDB database</p>
              <div className="shadow-lg overflow-x-auto">
                <table className="w-full text-left rounded-md mt-3 table-fixed">
                  <thead>
                    <tr className="bg-gray-300 ">
                      <th className="p-5">PostId</th>
                      <th className="p-5">Post Title</th>
                      <th className="p-5">Post Image</th>
                      <th className="p-5">Post Content</th>
                      <th className="p-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-5">1</td>
                      <td className="p-5">Title Post</td>
                      <td className="p-5">
                        <Image
                          className="rounded-md my-3"
                          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29kaW5nfGVufDB8fDB8fHww"
                          width={100}
                          height={100}
                          alt="image post"
                        />
                      </td>
                      <td className="p-5">test content</td>
                      <td className="p-5">
                        <Link
                          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                          href="/admin/posts/edit"
                        >
                          Edit
                        </Link>
                        <Link
                          className="bg-red-500 text-white px-4 py-2 rounded-md"
                          href="/admin/posts/delete"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
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

export default PostsPage;
