"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside
      data-testid="sidebar"
      role="complementary"
      aria-label="Sidebar"
      className="bg-neutral-900 w-full h-svh md:h-[calc(100svh-24px)] sticky top-3 md:border border-neutral-800 text-white p-4  md:rounded-md "
    >
      <div className="logo bg-neutral-300 p-4 rounded-md flex justify-center">
        <Image
          src="/Sephora-Logo.png"
          className="max-w-1/2"
          alt="logo"
          width={300}
          height={300}
        />
      </div>
      <nav className="flex flex-col gap-4 mt-10">
        <Link
          href="/"
          className="text-white text-lg flex gap-2 items-center p-2 w-full rounded-md hover:bg-neutral-800"
        >
          <FaHome className="inline" />
          Home
        </Link>
      </nav>
    </aside>
  );
}
