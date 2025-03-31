import { getSSRRepositories } from "@/app/features/repositories/hooks/useRepositories";
import RepositoryCard from "../molecules/RepositoryCard";

interface RepositoryListProps {
  search: string;
}

export default async function RepositoryList({ search }: RepositoryListProps) {
  const { repositories, error } = await getSSRRepositories(search);

  if (search === "") {
    return <div className="text-gray-500">Enter a search term to begin.</div>;
  }

  if (error)
    return (
      <div className="text-red-500">Failed to fetch repositories: {error}</div>
    );
  if (repositories.length === 0)
    return <div>No repositories found for &quot;{search}&quot;.</div>;

  return (
    <ul
      className="grid gap-4 overflow-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      aria-label="Repository List"
    >
      {repositories.map((item) => (
        <RepositoryCard key={item.id} user={search} repository={item} />
      ))}
    </ul>
  );
}
