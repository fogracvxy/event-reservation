import { getServerSession } from "next-auth/next";
import authOptions from "../lib/auth";
import UserInfo from "../components/UserInfo";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserInfo session={session} />
    </div>
  );
}
