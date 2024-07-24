import { getServerSession } from "next-auth/next";
import authOptions from "../lib/auth";
import { redirect } from "next/navigation";
import ReservationContent from "./components/ReservationContent";

export default async function Reservation() {
  const session = await getServerSession(authOptions);

  console.log("Server-side session:", session);

  if (!session) {
    redirect("/login");
  }

  return <ReservationContent />;
}
