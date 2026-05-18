"use client";

import { useEffect } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    };

    run();
  }, [router]);

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        Signing out...
      </div>
    </main>
  );
}
