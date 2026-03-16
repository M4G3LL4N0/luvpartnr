"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

export default function AddEntryPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const [entryType, setEntryType] = useState("note");
  const [content, setContent] = useState("");
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

    const { error } = await supabase.from("case_entries").insert({
      case_file_id: params.id,
      user_id: user.id,
      entry_type: entryType,
      content,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push(`/app/cases/${params.id}`);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">New entry</div>
        <h1 className="mt-4 text-4xl font-semibold">Add timeline entry</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <select
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3"
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
          >
            <option value="note">Note</option>
            <option value="event">Event</option>
            <option value="message_summary">Message Summary</option>
            <option value="conflict">Conflict</option>
            <option value="observation">Observation</option>
          </select>

          <textarea
            className="min-h-48 w-full rounded-2xl border border-white/10 bg-black px-4 py-3"
            placeholder="Describe what happened..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
            Save entry
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-zinc-400">{message}</p> : null}
      </div>
    </main>
  );
}
