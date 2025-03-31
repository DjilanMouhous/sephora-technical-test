import { SimplifiedUserType } from "@/app/features/users/types/simplifiedUserTypes";
import Loader from "../atoms/Loader";
import { UserLine } from "../molecules/UserLine";

export default function UserList({
  users,
  isLoading,
  error,
  show,
}: {
  users: SimplifiedUserType[];
  isLoading: boolean;
  error: string | null;
  show: boolean;
}) {
  if (isLoading && show) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!users || users.length === 0) return;

  return (
    <div
      data-testid="user-list"
      className={`w-full p-4 bg-neutral-900 shadow rounded-md ${
        show ? "block" : "hidden"
      }`}
    >
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserLine key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
