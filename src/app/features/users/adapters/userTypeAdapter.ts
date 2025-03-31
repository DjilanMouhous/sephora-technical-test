import { ApiUserType } from "../types/apiUserTypes";
import { SimplifiedUserType } from "../types/simplifiedUserTypes";

export class UserTypeAdapter {
  static simplifyUserAdapter = (repo: ApiUserType): SimplifiedUserType => {
    return {
      id: repo.id,
      login: repo.login,
      htmlUrl: repo.html_url,
      avatarUrl: repo.avatar_url,
    };
  };
}
