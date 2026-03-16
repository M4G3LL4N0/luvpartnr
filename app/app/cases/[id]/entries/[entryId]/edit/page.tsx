"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

export default function EditEntryPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const caseId = params.id as string;
  const entryId = params.entryId as string;

  const [entryType, setEntryType] = useState("note");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadEntry() {
      const { data, error } = await supabase
        .from("case_entries")
        .select("*")
        .eq("id", entryId)
        .single();

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        setEntryType(data.entry_type);
        setContent(data.content);
      }

      setLoading(false);
    }

    if (entryId) {
      loadEntry();
    }
  }, [entryId, supabase]);

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

    const { error } = await supabase
      .from("case_entries")
      .update({
        entry_type: entryType,
        content,
      })
      .eq("id", entryId)
      .eq("user_id", user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push(`/app/cases/${caseId}`);
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
          Loading entry...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Edit entry</div>
        <h1 className="mt-4 text-4xl font-semibold">Update timeline entry</h1>

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-medium text-black">
            Save changes
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-zinc-400">{message}</p> : null}
      </div>
    </main>
  );
}
