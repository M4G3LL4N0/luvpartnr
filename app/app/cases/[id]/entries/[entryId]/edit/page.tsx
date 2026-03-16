"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";

export default function EditEntryPage() {
  const { id: caseId, entryId } = useParams<{ id: string; entryId: string }>();
  const supabase = createClient();

  const [entryType, setEntryType] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load the entry data when the component mounts  useEffect(() => {
    async function loadEntry() {
      const { data, error } = await supabase
        .from("case_entries")
        .select("entry_type, content")
        .eq("id", entryId)
        .single();
      if (error) {
        setError(error.message);
        return;
      }
      setEntryType(data.entry_type ?? "");
      setContent(data.content ?? "");
    }
    loadEntry();
  }, [entryId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { data, error } = await supabase
      .from("case_entries")
      .update({ entry_type: entryType, content })
      .eq("id", entryId)
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "")
      .select();

    if (error) {
      setError("Failed to update entry.");
      setMessage("");
    } else {
      // Redirect back to the case detail page after successful update
      window.location.href = `/app/cases/${caseId}`;
    }
    setLoading(false);
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Edit entry</div>
          <h1 className="mt-4 text-4xl font-semibold">Edit timeline entry</h1>
          <p className="mt-2 text-zinc-300">{error}</p>
          <Link            href={`/app/cases/${caseId}`}
            className="mt-4 rounded-full border border-white/15 px-5 py-3 text-sm text-white"
          >
            Back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Edit entry</div>
        <h1 className="mt-4 text-4xl font-semibold">Edit timeline entry</h1>
        {message && <p className="mt-2 text-zinc-300">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <select
            name="entry_type"
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
            name="content"
            className="min-h-48 w-full rounded-2xl border border-white/10 bg-black px-4 py-3"
            placeholder="Describe what happened..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
          <Link
            href={`/app/cases/${caseId}`}
            className="mt-4 rounded-full border border-white/15 px-5 py-3 text-sm text-white"
          >
            Cancel          </Link>
        </form>
      </div>
    </main>
  );
}
