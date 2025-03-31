import { UserTypeAdapter } from "@/app/features/users/adapters/userTypeAdapter";
import { apiUserFixture } from "@/app/features/users/types/__fixtures__/apiUserTypes.fixture";
import { simplifiedUserFixture } from "@/app/features/users/types/__fixtures__/simplifiedUserTypes.fixture";

describe("[src/app/features/users/adapters]", () => {
  describe("#UserTypeAdapter", () => {
    it("should simplify user data correctly", () => {
      const simplifiedRepository =
        UserTypeAdapter.simplifyUserAdapter(apiUserFixture);

      expect(simplifiedRepository).toEqual(simplifiedUserFixture);
    });
  });
});
