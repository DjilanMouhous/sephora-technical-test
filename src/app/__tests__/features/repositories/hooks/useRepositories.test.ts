import { getSSRRepositories } from "@/app/features/repositories/hooks/useRepositories";
import { RepositoryService } from "@/app/features/repositories/services/repositoryService";
import { err, ok } from "neverthrow";

describe("[src/app/features/repositories/hooks]", () => {
  describe("#useSSRRepositories", () => {
    let repositorylistMock: jest.SpyInstance;

    beforeEach(() => {
      repositorylistMock = jest
        .spyOn(RepositoryService.prototype, "list")
        .mockResolvedValue(ok([]));
    });

    it("should return 0 repositories if search is undefined", async () => {
      const result = await getSSRRepositories();
      expect(result.repositories).toEqual([]);
      expect(result.error).toBeNull();
    });
    it("should return 0 repositories if search is empty", async () => {
      const result = await getSSRRepositories("");
      expect(result.repositories).toEqual([]);
      expect(result.error).toBeNull();
    });

    it("should return error message when the service call fails", async () => {
      repositorylistMock.mockResolvedValue(err(new Error("API Error")));

      const result = await getSSRRepositories("react");
      expect(result.repositories).toEqual([]);
      expect(result.error).toBe("API Error");
    });

    it("should return repositories when the service call is successful", async () => {
      repositorylistMock.mockResolvedValue(
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
            open_issues_count: 3,
          },
        ])
      );

      const result = await getSSRRepositories("react");
      expect(result.repositories.length).toBe(2);
      expect(result.error).toBeNull();
    });
  });
});
