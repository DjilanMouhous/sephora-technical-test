import { UserService } from "../services/userService";
import { SimplifiedUserType } from "../types/simplifiedUserTypes";

export const getSSRSingleUser = async (userName: string) => {
  const userService = new UserService();

  let user: SimplifiedUserType | undefined = undefined;
  let error = null;

  if (userName === "") {
    return { user, error };
  }

  const userResponse = await userService.getUserByName(userName);

  if (userResponse.isErr()) {
    error = userResponse.error.message;
  } else {
    user = userResponse.value;
  }

  return { user, error };
};
