import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: posts } = await supabase
    .from("posts")
    .select("*, users(name, user_name, avatar_url)");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hola Twitter 👋
      <AuthButtonServer />
      <pre>
        <code>{JSON.stringify(posts, null, 2)}</code>
      </pre>
    </main>
  );
}
