"use client";
import React from "react";

function DeleteBT({ id }) {
  const deletePost = async (id) => {
    const confirmed = confirm("Are you sure you want to delete");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/users-all/?id=${id}`, {
        method: "DELETE",
      });
      console.log(res);
      if (res.ok) {
        window.location.reload();
      }
    }
  };

  const handleDelete = async () => {
    deletePost(id);
  };

  return (
    <a
      onClick={handleDelete}
      className="rounded-md bg-red-500 text-white px-4 py-2 text-lg mx-2 "
    >
      Delete
    </a>
  );
}

export default DeleteBT;
