import { SimplifiedRepositoryType } from "../types/simplifiedRepositoryTypes";
import { RepositoryService } from "../services/repositoryService";

export const getSSRRepositories = async (search?: string) => {
  const repositoryService = new RepositoryService();

  let repositories: SimplifiedRepositoryType[] = [];
  let error = null;

  if (search == undefined || search === "") {
    return { repositories, error };
  }

  const repositoryListResult = await repositoryService.list(search);

  if (repositoryListResult.isErr()) {
    error = repositoryListResult.error.message;
  } else {
    repositories = repositoryListResult.value;
  }

  return { repositories, error };
};
