"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewCasePage() {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [relationshipStage, setRelationshipStage] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    const { error } = await supabase.from("case_files").insert({
      user_id: user.id,
      title,
      subject_name: subjectName,
      relationship_stage: relationshipStage,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/app/cases");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">New case file</div>
        <h1 className="mt-4 text-4xl font-semibold">Create a private file</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3"
            placeholder="Case title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3"
            placeholder="Subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3"
            placeholder="Relationship stage"
            value={relationshipStage}
            onChange={(e) => setRelationshipStage(e.target.value)}
          />

          <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
            Create case file
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-zinc-400">{message}</p> : null}
      </div>
    </main>
  );
}
