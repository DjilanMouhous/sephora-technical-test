"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SimplifiedUserType } from "../types/simplifiedUserTypes";
import { UserService } from "../services/userService";

export const useUserList = (search?: string) => {
  const [users, setUsers] = useState<SimplifiedUserType[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userService = useMemo(() => new UserService(), []);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    if (!search || search.length < 3) {
      setUsers(undefined);
      setError(null);
      setIsLoading(false);
      return;
    }
    const usersResult = await userService.list(search);
    if (usersResult.isErr()) {
      setError(usersResult.error.message);
      setIsLoading(false);
      return;
    }
    setUsers(usersResult.value);
    setError(null);
    setIsLoading(false);
  }, [search, userService]);

  useEffect(() => {
    loadItems();
  }, [loadItems, search]);

  return { users, isLoading, error };
};
