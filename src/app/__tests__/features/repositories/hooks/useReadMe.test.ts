import { getSSRReadme } from "@/app/features/repositories/hooks/useReadMe";
import { RepositoryService } from "@/app/features/repositories/services/repositoryService";
import { err, ok } from "neverthrow";

describe("[src/app/features/repositories/hooks]", () => {
  describe("#useSSRReadme", () => {
    let repositoryGetReadMeByRepositoryFullSlugMock: jest.SpyInstance;

    beforeEach(() => {
      repositoryGetReadMeByRepositoryFullSlugMock = jest
        .spyOn(RepositoryService.prototype, "getReadMeByRepositoryFullSlug")
        .mockResolvedValue(ok("Sample README content"));
    });
    it("should return readMe when the service call is successful", async () => {
      const result = await getSSRReadme({
        fullSlug: "user/repo",
        defaultBranch: "main",
      });

      expect(result.readMe).toBe("Sample README content");
      expect(result.error).toBeNull();
    });
    it("should return error message when the service call fails", async () => {
      repositoryGetReadMeByRepositoryFullSlugMock.mockResolvedValue(
        err(new Error("Failed to fetch repository readme"))
      );

      const result = await getSSRReadme({
        fullSlug: "user/repo",
        defaultBranch: "main",
      });

      expect(result.readMe).toBe("");
      expect(result.error).toBe("Failed to fetch repository readme");
    });
  });
});
