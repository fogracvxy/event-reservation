import { getServerSession } from "next-auth/next";
import authOptions from "../lib/auth";
import RegisterForm from "../components/RegisterForm";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/profile");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold mb-6">Registracija</h1>
      <RegisterForm />
    </div>
  );
}
