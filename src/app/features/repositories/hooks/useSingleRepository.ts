import { SimplifiedRepositoryType } from "../types/simplifiedRepositoryTypes";
import { RepositoryService } from "../services/repositoryService";

export const getSSRSingleRepositories = async (repository_slug: string) => {
  const repositoryService = new RepositoryService();

  let repository: SimplifiedRepositoryType | undefined = undefined;
  let error = null;

  if (repository_slug === "") {
    return { repository, error };
  }

  const repositoryResult = await repositoryService.getByRepositorySlug(
    repository_slug
  );

  if (repositoryResult.isErr()) {
    error = repositoryResult.error.message;
  } else {
    repository = repositoryResult.value;
  }
  return { repository, error };
};
