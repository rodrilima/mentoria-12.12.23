import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "../components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="bg-neutral h-screen pt-12">
      <div className="max-w-screen-lg mx-auto text-white pb-2 flex justify-between px-2">
        <div>Olá, {session.user.name}</div>
        <LogoutButton />
      </div>
      <div className="bg-white max-w-screen-lg mx-auto rounded-lg p-6">
        {children}
      </div>
    </main>
  );
}
