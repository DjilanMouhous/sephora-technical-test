import { getSSRSingleUser } from "@/app/features/users/hooks/useSingleUser";
import { UserService } from "@/app/features/users/services/userService";
import { simplifiedUserFixture } from "@/app/features/users/types/__fixtures__/simplifiedUserTypes.fixture";
import { err, ok } from "neverthrow";

describe("[src/app/features/users/hooks]", () => {
  describe("#useSSRSingleUser", () => {
    let repositorylistMock: jest.SpyInstance;

    beforeEach(() => {
      repositorylistMock = jest
        .spyOn(UserService.prototype, "getUserByName")
        .mockResolvedValue(ok(simplifiedUserFixture));
    });

    it("should return undefined if userName is undefined", async () => {
      const result = await getSSRSingleUser("");
      expect(result.user).toEqual(undefined);
      expect(result.error).toBeNull();
    });

    it("should return error message when the service call fails", async () => {
      repositorylistMock.mockResolvedValue(err(new Error("API Error")));

      const result = await getSSRSingleUser("facebook");
      expect(result.user).toEqual(undefined);
      expect(result.error).toBe("API Error");
    });
    it("should return user when the service call is successful", async () => {
      repositorylistMock.mockResolvedValue(ok(simplifiedUserFixture));

      const result = await getSSRSingleUser("facebook");
      expect(result.user).toEqual(simplifiedUserFixture);
      expect(result.error).toBeNull();
    });
  });
});
