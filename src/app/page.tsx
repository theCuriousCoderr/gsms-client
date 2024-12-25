"use client";

import Logo from "@/svgs/tallyLogo";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Spinner() {
  return (
    <div className="flex gap-3 items-center">
      <p className="text-[#0A0A0A]/60 font-medium">Checking</p>
      <div className="size-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    setLoading(true);
    e.preventDefault();

    if (email) {
      setTimeout(() => {
        localStorage.setItem("KeyCountEmail", email);
        setLoading(false);
        router.push("/dashboard");
      }, 2000);
    } else {
      setLoading(false);
    }
  }

  return (
    <main className="relative h-screen w-full p-5 bg-[#0A0A0A]">
      <div className="flex flex-col size-full borde rounded-lg bg-[#e9eeea">
        <header className="relative z-10 flex justify-between items-center">
          <div className="flex items-center">
            <div className="size-8">
              <Logo fill="#FFFFFF" stroke="#000000" />
            </div>
            <p className="font-bold first-letter:italic first-letter:text-xl text-[#EDEDED]">
              KeyCount{" "}
            </p>
          </div>

          <p className="text-[#EDEDED] xs:max-md:hidden">
            A User Dashboard for the KeyCount VSCode Extension
          </p>
        </header>
        <section className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <div className=" flex flex-col items-center">
            <p className="text-center font-bold text-[#EDEDED] text-2xl w-80">
              Log in to KeyCount
            </p>
            <form onSubmit={handleSubmit} className="max-w-80 space-y-2 mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-lg bg-[#0A0A0A] border border-white/20 hover:border-white/50 p-5 text-[#EDEDED]"
                placeholder="Email"
              />
              <button
                disabled={loading}
                className="w-full h-12 rounded-lg bg-[#EDEDED] hover:bg-[#EDEDED]/85 disabled:hover:bg-[#EDEDED]/50 disabled:bg-[#EDEDED]/50  text-[#0A0A0A] font-medium flex items-center justify-center"
              >
                {loading ? <Spinner /> : "Continue with Email"}
              </button>
              {email === "Invalid" && (
                <p className="text-red-400 text-sm font-extralight">
                  Please put in your KeyCount Email text-center
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
