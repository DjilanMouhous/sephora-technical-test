import Button from "@/app/components/atoms/Button";
import { getSSRReadme } from "@/app/features/repositories/hooks/useReadMe";
import { getSSRSingleRepositories } from "@/app/features/repositories/hooks/useSingleRepository";
import { notFound } from "next/navigation";
import {
  FaStar,
  FaCodeBranch,
  FaRegClock,
  FaEye,
  FaFileCode,
  FaUser,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Page({
  params,
}: {
  params: Promise<{
    user_slug: string;
    repo_slug: string;
  }>;
}) {
  const { user_slug, repo_slug } = await params;
  const totalRepositorySlug = `${user_slug}/${repo_slug}`;
  const fetchRepository = await getSSRSingleRepositories(totalRepositorySlug);
  if (fetchRepository.error || !fetchRepository.repository) {
    console.error(
      `Error fetching repository: ${
        fetchRepository.error || "No repository found"
      }`
    );
    return notFound();
  }
  const repository = fetchRepository.repository;
  let readMe = undefined;
  if (repository.defaultBranch) {
    const fetchReadMe = await getSSRReadme({
      fullSlug: totalRepositorySlug,
      defaultBranch: repository.defaultBranch,
    });
    readMe = fetchReadMe.readMe;
  }
  const Block = ({
    children,
    fullScreen = false,
    className = "",
  }: {
    children: React.ReactNode;
    fullScreen?: boolean;
    className?: string;
  }) => (
    <div
      className={`bg-neutral-900 border border-neutral-800 rounded-md p-6 ${
        fullScreen ? "col-span-2" : ""
      } ${className} `}
    >
      {children}
    </div>
  );
  return (
    <div className="">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        <Block className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4 font-title">
              {repository.name}
            </h2>
            <p className=" mb-6">
              {repository.description || "No description provided."}
            </p>
          </div>

          <Button
            href={repository.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            View Repository
          </Button>
        </Block>
        <Block>
          <div className="flex items-center gap-2 ">
            <FaUser className="text-blue-500" />
            <span>Owner: {repository.owner?.login}</span>
          </div>

          <div className="flex items-center gap-2 ">
            <FaFileCode className="text-green-500" />
            <span>Language: {repository.language || "Not specified"}</span>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            <FaStar />
            <span>{repository.stargazersCount} Stars</span>
          </div>

          <div className="flex items-center gap-2 text-green-500">
            <FaCodeBranch />
            <span>{repository.forksCount} Forks</span>
          </div>
          {repository.updatedAt && (
            <div className="flex items-center gap-2 text-blue-500">
              <FaRegClock />
              <span>Updated: {repository.updatedAt.toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-purple-500">
            <FaEye />
            <span>{repository.watchersCount} Watchers</span>
          </div>

          <div className="flex items-center gap-2 ">
            <span>Open Issues: {repository.openIssuesCount}</span>
          </div>

          <div className="flex items-center gap-2 ">
            <span>License: {repository.license?.name || "No license"}</span>
          </div>
          {repository.createdAt && (
            <div className="flex items-center gap-2 ">
              <span>Created: {repository.createdAt.toLocaleDateString()}</span>
            </div>
          )}
        </Block>

        {readMe && (
          <Block fullScreen>
            <h2 className="text-2xl font-bold mb-4 font-title">ReadMe</h2>
            <div className="prose prose-invert max-w-none	">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {readMe}
              </ReactMarkdown>
            </div>
          </Block>
        )}
      </div>
    </div>
  );
}
