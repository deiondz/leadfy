import React from "react";
import Profile from "./Profile";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between w-full py-20 items-center h-20">
      <Link href="/">
        <img src="/placeholder2.svg" alt="" className="fill-white" />
      </Link>
      <Profile />
    </div>
  );
}
