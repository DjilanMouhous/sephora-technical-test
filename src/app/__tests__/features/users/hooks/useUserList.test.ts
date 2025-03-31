import { useUserList } from "@/app/features/users/hooks/useUserList";
import { UserService } from "@/app/features/users/services/userService";
import { renderHook, waitFor } from "@testing-library/react";
import { err, ok } from "neverthrow";

describe("[src/app/features/users/hooks]", () => {
  describe("#useUserList", () => {
    let userListMock: jest.SpyInstance;

    beforeEach(() => {
      userListMock = jest
        .spyOn(UserService.prototype, "list")
        .mockResolvedValue(ok([]));
    });

    it("should return undefined if userName is undefined", () => {
      const { result } = renderHook(() => useUserList(""));
      const { users, error } = result.current;
      expect(users).toEqual(undefined);
      expect(error).toBeNull();
    });
    it("should return error message when the service call fails", async () => {
      userListMock.mockResolvedValue(err(new Error("API Error")));
      const { result } = renderHook(() => useUserList("react"));
      await waitFor(() => {
        const { users, isLoading, error } = result.current;
        expect(error).toBe("API Error");
        expect(users).toEqual(undefined);
        expect(isLoading).toBe(false);
      });
    });

    it("should return users when the service call is successful", async () => {
      userListMock.mockResolvedValue(
        ok([
          {
            id: 1,
            login: "user1",
            avatar_url: "https://example.com/user1.png",
          },
          {
            id: 2,
            login: "user2",
            avatar_url: "https://example.com/user2.png",
          },
        ])
      );
      const { result } = renderHook(() => useUserList("react"));
      await waitFor(() => {
        const { users, isLoading, error } = result.current;
        expect(users?.length).toBe(2);
        expect(error).toBeNull();
        expect(isLoading).toBe(false);
      });
    });
  });
});
