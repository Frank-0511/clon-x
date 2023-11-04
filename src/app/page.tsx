import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";
import { PostCard } from "./components/post-card";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: posts } = await supabase
    .from("posts")
    .select("*, user:users(name, user_name, avatar_url)");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hola Twitter 👋
      <AuthButtonServer />
      <section className="flex flex-col gap-5">
        {posts?.map((post) => (
          <PostCard
            avatarUrl={post.user.avatar_url}
            content={post.content}
            key={post.id}
            userFullName={post.user.name}
            userName={post.user.user_name}
          />
        ))}
      </section>
    </main>
  );
}
