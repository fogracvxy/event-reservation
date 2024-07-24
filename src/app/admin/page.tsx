import { getServerSession } from "next-auth/next";
import authOptions from "../lib/auth";
import AdminClient from "../_components/AdminClient";
import UnauthorizedClient from "../_components/UnauthorizedClient";

export default async function Admin() {
  const session = await getServerSession(authOptions);
  console.log("Session in Admin page:", session);

  if (!session) {
    return <UnauthorizedClient />;
  }
  if (session.user.role !== "admin") {
    return <AdminClient session={session} />;
  }
}
