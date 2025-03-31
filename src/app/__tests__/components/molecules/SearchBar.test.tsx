import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "@/app/components/molecules/SearchBar";
import { UserService } from "@/app/features/users/services/userService";
import { ok } from "neverthrow";

jest.useFakeTimers();

describe("[src/app/components/molecules/]", () => {
  describe("#SearchBar", () => {
    let userServiceListMock: jest.SpyInstance;

    beforeEach(() => {
      userServiceListMock = jest
        .spyOn(UserService.prototype, "list")
        .mockResolvedValue(ok([]));
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("renders initial input with default value", () => {
      render(<SearchBar value="initial" />);
      const input = screen.getByPlaceholderText("Search by username");
      expect(input).toHaveValue("initial");
    });

    it("does not show SearchButton if input is empty", () => {
      render(<SearchBar value="" />);
      expect(screen.queryByText("Search")).not.toBeInTheDocument();
    });

    it("shows SearchButton if input has text", () => {
      render(<SearchBar value="testuser" />);
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("triggers delayed search after typing", async () => {
      userServiceListMock.mockResolvedValue(
        ok([
          {
            id: 1,
            login: "john_doe",
            avatarUrl: "https://example.com/avatar.jpg",
            htmlUrl: "https://example.com/john_doe",
          },
          {
            id: 2,
            login: "jane_doe",
            avatarUrl: "https://example.com/avatar2.jpg",
            htmlUrl: "https://example.com/jane_doe",
          },
        ])
      );

      render(<SearchBar value="" />);
      const input = screen.getByPlaceholderText("Search by username");

      fireEvent.change(input, { target: { value: "john" } });
      expect(input).toHaveValue("john");
      jest.advanceTimersByTime(499);

      expect(userServiceListMock).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      await waitFor(() => {
        expect(userServiceListMock).toHaveBeenCalledTimes(1);
      });
    }, 5000);

    it("does not show user list if it is first load", async () => {
      userServiceListMock.mockResolvedValue(
        ok([
          {
            id: 1,
            login: "john_doe",
            avatarUrl: "https://example.com/avatar.jpg",
            htmlUrl: "https://example.com/john_doe",
          },
        ])
      );

      render(<SearchBar value="john" />);
      await waitFor(() => {
        const userListEl = screen.queryByTestId("user-list");
        expect(userListEl).not.toBeInTheDocument();
      });
    });
  });
});
