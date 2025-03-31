import { SimplifiedUserType } from "../../users/types/simplifiedUserTypes";

export type SimplifiedRepositoryType = {
  id: number;
  name: string;
  owner: SimplifiedUserType;
  description?: string;
  htmlUrl: string;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  watchersCount: number;
  language?: string;
  license?: {
    name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  defaultBranch?: string;
};
