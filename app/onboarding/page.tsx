"use client";

import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold mb-8"> Unlock the Power of Behavioral Insights </h1>
        <p className="text-xl mb-8"> Track every interaction. Analyze behavioral patterns. Transform your understanding of human dynamics. </p>
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg">
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-white text-2xl">→</span>
            </div>
          </div>
        </div>
        <button onClick={() => router.push("/app/cases/new")} className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg"> Begin Your First Analysis </button>
      </div>
    </main>
  );
}
