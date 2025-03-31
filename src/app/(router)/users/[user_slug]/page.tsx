import { UserCard } from "@/app/components/molecules/UserCard";
import ItemList from "../../../components/organisms/RepositoryList";
import { getSSRSingleUser } from "@/app/features/users/hooks/useSingleUser";
import { notFound } from "next/navigation";
import { SearchBar } from "@/app/components/molecules/SearchBar";

export default async function Page({
  params,
}: {
  params: Promise<{ user_slug: string }>;
}) {
  const { user_slug } = await params;
  const fetchUser = await getSSRSingleUser(user_slug);
  if (fetchUser.error || !fetchUser.user) {
    return notFound();
  }
  const user = fetchUser.user;
  return (
    <div className="flex flex-col gap-4 w-full">
      <SearchBar value={user_slug} />
      <UserCard user={user} />
      <ItemList search={user_slug} />
    </div>
  );
}
