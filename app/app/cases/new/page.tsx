"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewCasePage() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [relationshipType, setRelationshipType] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.from("case_files").insert({
      user_id: user.id,
      title,
      subject_name: subjectName,
      relationship_type: relationshipType,
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push("/app/cases");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">New Case File</div>
        <h1 className="mt-4 text-4xl font-semibold">Create a Private File</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Start tracking behavioral patterns and insights in your relationships
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">Case Title</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 placeholder:text-zinc-500 focus:border-white/20 focus:ring-2 focus:ring-white/20"
              placeholder="e.g. 'Relationship with Alex'"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">Subject Name</label>
            <input
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 placeholder:text-zinc-500 focus:border-white/20 focus:ring-2 focus:ring-white/20"
              placeholder="Enter the person's name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            <p className="text-xs text-zinc-500">Optional - you can add this later</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-300">Relationship Type</label>
            <select
              className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-zinc-300 placeholder:text-zinc-500 focus:border-white/20 focus:ring-2 focus:ring-white/20"
              value={relationshipType}
              onChange={(e) => setRelationshipType(e.target.value)}
              required
            >
              <option value="" disabled className="text-zinc-500">
                Select relationship type
              </option>
              <option value="dating" className="text-zinc-300">Romantic Relationship</option>
              <option value="friendship" className="text-zinc-300">Friendship</option>
              <option value="work" className="text-zinc-300">Professional Relationship</option>
              <option value="family" className="text-zinc-300">Family Relationship</option>
            </select>
            <p className="text-xs text-zinc-500">
              Helps us provide more relevant insights
            </p>
          </div>

          <button
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Case File"}
          </button>
        </form>

        {message ? (
          <p className="mt-4 text-sm text-zinc-400">{message}</p>
        ) : null}
      </div>
    </main>
  );
}
