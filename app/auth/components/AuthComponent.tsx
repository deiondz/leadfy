"use client";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { KeyRound } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function AuthComponent() {
  const params = useSearchParams();
  const next = params.get("next") || "";
  const handleLoginWithOAuth = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + next,
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className=" w-96 rounded-md  p-5 space-y-5 relative bg-main">
        <div className="flex items-center text-black gap-2">
          <KeyRound />
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <p className="text-sm font-semibold text-gray-950">
          Register/Sign In Today
        </p>
        <div className="flex flex-col gap-5">
          <Button
            className=" w-full flex items-center gap-2 "
            variant={"neutral"}
            onClick={() => handleLoginWithOAuth("google")}
          >
            <FcGoogle /> Google
          </Button>
        </div>
        <div className="glowBox -z-10"></div>
      </div>
    </div>
  );
}
