// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
"use client";
import "./globals.css";


import { Grid, Grid2X2, Menu, Settings, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "KeyCount User Dashboard",
//   description: "Explore the interactive dashboard for our VS Code extension that tracks and counts keyboard usage. Get real-time insights into how often each key or letter is pressed, perfect for developers, typists, and productivity enthusiasts!",
// };

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const [openSideBar, setOpenSideBar] = useState(false);
  function toggleOpenSideBar() {
    setOpenSideBar(!openSideBar);
  }

  return (
    <html lang="en">
      <body>
        <div className="absolute left-2 top-2 size-6 ">
          <button
            onClick={toggleOpenSideBar}
            className="size-full rounded-sm flex items-center justify-center bg-white"
          >
            <Menu size={18} />
          </button>
        </div>
        
        {openSideBar && (
          <div className="absolute z-10 top-0 h-screen w-60 bg-white left-0 p-2">
            <div className="size-6">
              <button
                onClick={toggleOpenSideBar}
                className="size-full rounded-sm flex items-center justify-center bg-gray-800"
              >
                <X size={18} color="#ffffff" />
              </button>
            </div>
            <div className="mt-5 space-y-2">
              <div>
                <button onClick={() => { router.push("/dashboard"); setOpenSideBar(false); }} className="flex items-center gap-1 w-full p-2 hover:bg-slate-400">
                  <div className="size-5 flex items-center justify-center ">
                    <Grid2X2 size={18} />
                  </div>
                  <p>Dashboard</p>
                </button>
              </div>
              <div>
                <button onClick={() => { router.push("/settings"); setOpenSideBar(false); }} className="flex items-center gap-1 w-full p-2 hover:bg-slate-400">
                  <div className="size-5 flex items-center justify-center ">
                    <Settings size={18} />
                  </div>
                  <p>Settings</p>
                </button>
              </div>
            </div>
          </div>
        )}
         <h2 className="pl-12 py-2 font-bold text-lg bg-gray-800 text-[#ecf0f3] uppercase">
        AI-POWERED GRAIN STORAGE MONITORING SYSTEM {pathname.slice(1)}
      </h2>
        {children}
      </body>
    </html>
  );
}
