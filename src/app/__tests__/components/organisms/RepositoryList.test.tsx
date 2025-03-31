import { render, screen } from "@testing-library/react";
import RepositoryList from "@/app/components/organisms/RepositoryList";
import { RepositoryService } from "@/app/features/repositories/services/repositoryService";
import { err, ok } from "neverthrow";

describe("[src/app/components/organisms/]", () => {
  describe("#RepositoryList", () => {
    let repositoryServiceMock: jest.SpyInstance;

    beforeEach(() => {
      repositoryServiceMock = jest
        .spyOn(RepositoryService.prototype, "list")
        .mockResolvedValue(ok([]));
    });

    it("display a message if search is empy", async () => {
      const asyncRender = await RepositoryList({ search: "" });
      const result = render(asyncRender);
      expect(
        result.getByText("Enter a search term to begin.")
      ).toBeInTheDocument();
    });

    it("display an error message if service failed", async () => {
      repositoryServiceMock.mockResolvedValue(err(new Error("API Error")));
      const asyncRender = await RepositoryList({ search: "react" });

      render(asyncRender);

      expect(
        screen.getByText("Failed to fetch repositories: API Error")
      ).toBeInTheDocument();
    });

    it("display a message if no repository is found", async () => {
      repositoryServiceMock.mockResolvedValue(ok([]));

      const asyncRender = await RepositoryList({ search: "unknown_user" });

      render(asyncRender);

      expect(
        screen.getByText('No repositories found for "unknown_user".')
      ).toBeInTheDocument();
    });

    it("display correctly the list of repositories", async () => {
      repositoryServiceMock.mockResolvedValue(
        ok([
          {
            id: 1,
            name: "repo1",
            stargazers_count: 10,
            forks_count: 5,
            open_issues_count: 2,
          },
          {
            id: 2,
            name: "repo2",
            stargazers_count: 20,
            forks_count: 8,
            open_issues_count: 1,
          },
        ])
      );
      const asyncRender = await RepositoryList({ search: "react" });

      render(asyncRender);

      expect(screen.getByText("repo1")).toBeInTheDocument();
      expect(screen.getByText("repo2")).toBeInTheDocument();
    });
  });
});
