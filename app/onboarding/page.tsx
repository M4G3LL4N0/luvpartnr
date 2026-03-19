"use client";

import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-semibold">
          Understand People Before You Commit
        </h1>

        <p className="mt-4 text-zinc-400">
          Track interactions. Analyze behavior. Make better decisions.
        </p>

        <button
          onClick={() => router.push("/app/cases/new")}
          className="mt-8 bg-white text-black px-6 py-3 rounded-full"
        >
          Start First Case
        </button>
      </div>
    </main>
  );
}
