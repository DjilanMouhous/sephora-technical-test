import { SearchBar } from "../components/molecules/SearchBar";
import RepositoryList from "../components/organisms/RepositoryList";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <SearchBar value={""} />
      <p>Find every repositories of any Github user !</p>
      <RepositoryList search="" />
    </div>
  );
}
