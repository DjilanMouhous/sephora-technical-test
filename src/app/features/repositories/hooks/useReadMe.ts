import { RepositoryService } from "../services/repositoryService";

export const getSSRReadme = async ({
  fullSlug,
  defaultBranch,
}: {
  fullSlug: string;
  defaultBranch: string;
}) => {
  const repositoryService = new RepositoryService();

  let readMe: string = "";
  let error = null;

  const readMeResult = await repositoryService.getReadMeByRepositoryFullSlug({
    repositorySlug: fullSlug,
    defaultBranch: defaultBranch,
  });

  if (readMeResult.isErr()) {
    error = readMeResult.error.message;
  } else {
    readMe = readMeResult.value;
  }

  return { readMe, error };
};
