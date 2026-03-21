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

    // Fire-and-forget: analyze entry in background, do not block UI
    (async () => {
      try {
        await fetch("/api/analyze-entry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caseFileId: params.id,
            entryType,
            content,
            userId: user.id,
          }),
        });
      } catch (e) {
        // Silently ignore errors
      }
    })();

    router.push(`/app/cases/${params.id}`);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/50 to-zinc-900/20 p-8 shadow-2xl shadow-black/50">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">New Entry</div>
        <h1 className="mt-4 text-4xl font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Add Timeline Entry
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Entry Type
            </label>
            <select
              className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20 focus:outline-none transition-all"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
            >
              <option value="note">📝 Note</option>
              <option value="event">🎯 Event</option>
              <option value="message_summary">💬 Message Summary</option>
              <option value="conflict">⚡ Conflict</option>
              <option value="observation">🔍 Observation</option>
            </select>
            <p className="mt-2 text-xs text-zinc-400">
              Choose the type that best describes this interaction
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Details
            </label>
            <textarea
              className="min-h-48 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20 focus:outline-none transition-all"
              placeholder="Describe what happened... (Be specific about behaviors, words used, and context)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <p className="mt-2 text-xs text-zinc-400">
              Record exact words, behaviors, and context for better analysis
            </p>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 px-5 py-3 text-sm font-medium text-white border border-white/10 hover:bg-zinc-700/50 transition-all hover:shadow-lg hover:shadow-black/20"
            onClick={async () => {
              if (!content.trim()) return;
              const res = await fetch("/api/analyze-message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: content }),
              });
              const data = await res.json();
              if (data && !data.error) {
                alert(
                  `Tone: ${data.tone}\nIntent: ${data.intent}\nEmotional State: ${data.emotionalState}\n\nSuggested Replies:\n- Neutral: ${data.suggestedReplies?.neutral}\n- Confident: ${data.suggestedReplies?.confident}\n- Assertive: ${data.suggestedReplies?.assertive}`
                );
              } else {
                alert("Could not analyze message.");
              }
            }}
            style={{ marginTop: 8, marginBottom: 8 }}
          >
            Analyze with AI
          </button>

          <button className="w-full rounded-xl bg-gradient-to-r from-white to-zinc-200 px-5 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/10">
            Save Entry
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-zinc-400">{message}</p> : null}
      </div>
    </main>
  );
}
