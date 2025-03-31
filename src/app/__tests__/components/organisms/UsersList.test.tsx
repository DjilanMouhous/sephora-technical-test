import { render, screen } from "@testing-library/react";
import { SimplifiedUserType } from "@/app/features/users/types/simplifiedUserTypes";
import UserList from "@/app/components/organisms/UsersList";

const mockUsers: SimplifiedUserType[] = [
  { id: 1, login: "user1", avatarUrl: "/avatar1.png", htmlUrl: "/user1" },
  { id: 2, login: "user2", avatarUrl: "/avatar2.png", htmlUrl: "/user2" },
];

describe("[src/app/components/organisms/]", () => {
  describe("#UsersList", () => {
    it("hide the userList if there are users but we want to hide it", () => {
      render(
        <UserList
          users={mockUsers}
          isLoading={false}
          error={null}
          show={false}
        />
      );
      const userList = screen.getByTestId("user-list");
      expect(userList).toHaveClass("hidden");
      expect(userList).not.toHaveClass("block");
    });

    it("display loader if it should visible and loading is true", () => {
      render(<UserList users={[]} isLoading={true} error={null} show={true} />);
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("do not display loader if it should visible and loading is false", () => {
      render(
        <UserList users={[]} isLoading={false} error={null} show={true} />
      );
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
    it("do not display loader if it should not visible and loading is true", () => {
      render(
        <UserList users={[]} isLoading={true} error={null} show={false} />
      );
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("show error message if there is an error", () => {
      render(
        <UserList
          users={[]}
          isLoading={false}
          error="Loading error"
          show={true}
        />
      );
      expect(screen.getByText("Loading error")).toBeInTheDocument();
    });

    it("do not render if there are no users", () => {
      render(
        <UserList users={[]} isLoading={false} error={null} show={true} />
      );
      expect(screen.queryByTestId("user-line")).not.toBeInTheDocument();
    });

    it("display list of user", () => {
      render(
        <UserList
          users={mockUsers}
          isLoading={false}
          error={null}
          show={true}
        />
      );
      expect(screen.getAllByTestId("user-line").length).toBe(2);
      expect(screen.getByText("user1")).toBeInTheDocument();
      expect(screen.getByText("user2")).toBeInTheDocument();
    });

    it("is visible when show is true", () => {
      render(
        <UserList
          users={mockUsers}
          isLoading={false}
          error={null}
          show={true}
        />
      );
      const userList = screen.getByTestId("user-list");
      expect(userList).toHaveClass("block");
      expect(userList).not.toHaveClass("hidden");
    });
  });
});
