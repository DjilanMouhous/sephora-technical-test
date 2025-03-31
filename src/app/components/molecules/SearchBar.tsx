"use client";
import React from "react";
import Input from "../atoms/Input";
import { FaUser } from "react-icons/fa";
import { useUserList } from "@/app/features/users/hooks/useUserList";
import UserList from "../organisms/UsersList";
import Button from "../atoms/Button";

export function SearchBar({ value }: { value: string }) {
  const [currentSearch, setCurrentSearch] = React.useState<string>(value);
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const initalLoad = React.useRef<boolean>(true);

  const { users, error, isLoading } = useUserList(search);
  // Delayed search to avoid too many requests
  React.useEffect(() => {
    if (initalLoad.current) {
      initalLoad.current = false;
    } else if (currentSearch !== search) {
      const timeout = setTimeout(() => {
        setSearch(currentSearch);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentSearch, search, users]);

  const SearchButton = () => {
    if (currentSearch === "") return null;
    return (
      <Button
        className="absolute right-1 top-1/2 -translate-y-1/2"
        href={`/users/${currentSearch}`}
      >
        Search
      </Button>
    );
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-full">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by username"
          value={currentSearch}
          onChange={setCurrentSearch}
          className="pl-10 w-full"
        />
        <SearchButton />
      </div>
      <UserList
        show={!initalLoad.current}
        users={users || []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
