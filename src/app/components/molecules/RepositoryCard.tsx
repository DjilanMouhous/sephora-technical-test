import { SimplifiedRepositoryType } from "@/app/features/repositories/types/simplifiedRepositoryTypes";
import Link from "next/link";
import React from "react";
import { FaBug, FaStar } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";

export default function RepositoryCard({
  repository,
  user,
}: {
  repository: SimplifiedRepositoryType;
  user: string;
}) {
  if (!repository.name) return null;
  return (
    <Link
      className="p-4 bg-neutral-900 aspect-square border flex flex-col justify-between border-neutral-800 rounded-md transition-colors hover:bg-neutral-800"
      href={`/users/${user}/${repository.name}`}
      aria-label={`Repository ${repository.name} by ${user}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-title text-2xl font-bold break-all">
          {repository.name}
        </h3>
        <p className="text-sm line-clamp-3">
          {repository.description || "No description available"}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2 rounded-md">
          <FaStar className="inline" />
          <span>{repository.stargazersCount}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md">
          <FaCodeFork className="inline" />
          <span>{repository.forksCount}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md">
          <FaBug className="inline" />
          <span>{repository.openIssuesCount}</span>
        </div>
      </div>
    </Link>
  );
}
