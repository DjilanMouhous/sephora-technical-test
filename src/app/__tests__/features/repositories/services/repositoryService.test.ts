import { RepositoryService } from "@/app/features/repositories/services/repositoryService";
import { apiRepositoryFixture } from "@/app/features/repositories/types/__fixtures__/apiRepositoryTypes.fixture";
import { simplifiedRepositoryFixture } from "@/app/features/repositories/types/__fixtures__/simplifiedRepositoryTypes.fixture";
import { err, ok } from "neverthrow";

describe("[src/app/features/repositories/services]", () => {
  describe("RepositoryService", () => {
    const repositoryService = new RepositoryService();

    describe("#list", () => {
      it("should return repositories when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue([]),
        });

        const result = await repositoryService.list("react");
        expect(result).toEqual(ok([]));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await repositoryService.list("react");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch repositories")));
      });
    });

    describe("#getByRepositorySlug", () => {
      it("should return a repository when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(apiRepositoryFixture),
        });

        const result = await repositoryService.getByRepositorySlug("user/repo");
        expect(result).toEqual(ok(simplifiedRepositoryFixture));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await repositoryService.getByRepositorySlug("user/repo");
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(err(new Error("Failed to fetch repository")));
      });
    });

    describe("#getReadMeByRepositoryFullSlug", () => {
      it("should return readMe when the service call is successful", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue("Sample README content"),
        });

        const result = await repositoryService.getReadMeByRepositoryFullSlug({
          repositorySlug: "user/repo",
          defaultBranch: "main",
        });
        expect(result).toEqual(ok("Sample README content"));
      });
      it("should return error when the service call fails", async () => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: false,
          statusText: "Failed to fetch",
        });

        const result = await repositoryService.getReadMeByRepositoryFullSlug({
          repositorySlug: "user/repo",
          defaultBranch: "main",
        });
        expect(result.isErr()).toBe(true);
        expect(result).toEqual(
          err(new Error("Failed to fetch repository readme"))
        );
      });
    });
  });
});
