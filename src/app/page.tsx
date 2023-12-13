import { getServerSession } from "next-auth";
import FormLogin from "./components/FormLogin";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/produtos");
  }

  return (
    <main className="h-screen flex justify-center items-center bg-neutral">
      <div className="bg-white p-12 rounded-lg">
        <FormLogin />
      </div>
    </main>
  );
}
