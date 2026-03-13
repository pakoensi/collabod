import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PlatformHome() {
  const { userId } = await auth();

  // redirect logged in users
  if (userId) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-yellow-100">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-xl font-semibold">Collabod</h1>

        <div className="flex items-center gap-6">
          <Link href="/team" className="text-gray-700 hover:text-black font-medium">
            Team
          </Link>

          <Link href="/pricing" className="text-gray-700 hover:text-black font-medium">
            Pricing
          </Link>

          <Link href="/sign-in" className="text-gray-700 hover:text-black font-medium">
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="bg-black text-white px-4 py-2 rounded-full hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-32">
        <h2 className="text-5xl md:text-6xl font-semibold text-gray-900">
          Welcome to Collabod
        </h2>

        <p className="mt-6 text-gray-600 max-w-xl">
          Collaborate, brainstorm, and build ideas together in one seamless
          digital workspace.
        </p>
      </section>
    </main>
  );
}