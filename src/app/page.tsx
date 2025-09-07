"use client";

import Logo from "@/svgs/tallyLogo";
import {
  ChartNoAxesCombined,
  Droplets,
  FileClock,
  House,
  MonitorCog,
  Radio,
  ThermometerSun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Spinner() {
  return (
    <div className="flex gap-3 items-center">
      <div className="size-5 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function goToDashboard() {
    setLoading(true);
    router.push("/dashboard");
    // setLoading(false);
     
  }

  return (
    <main className="relative h-screen overflow-auto w-full p-5 bg-[#c3eb6c bg-[#22b886 flex flex-col gap-10">
      <div className="space-y-5">
        {/* text */}
        <div>
          <h1 className="text-2xl font-bold text-center">Remote Monitoring</h1>
          <p className="text-lg font-light text-center leading-tight">
            Monitor the internal conditions of your grain storage structure.
          </p>
        </div>
        {/* icons */}
        <div className="relative mx-auto w-[50%] max-w-[300px] aspect-[1/2.5] lg:aspect-[1/1.5] max-h-60 lg:max-h-max  bg-[#ecf0f3] flex items-center justify-center rounded-md ">
          {/* right hand side */}
          <div className="absolute -right-10 h-full lg:h-[90%] w-8 flex flex-col justify-between">
            <div>
              <div className="size-8 bg-[#22b886] rounded-full rounded-bl-none flex items-center justify-center">
                <ThermometerSun color="#ecf0f3" size={18} />
              </div>
              <p className="text-[10px] lg:text-sm">Live Temperature</p>
            </div>

            <div>
              <div className="size-8 bg-[#22b886] rounded-full rounded-l-none flex items-center justify-center">
                <FileClock color="#ecf0f3" size={18} />
              </div>
              <p className="text-[10px] lg:text-sm">History Logs</p>
            </div>

            <div>
              <div className="size-8 bg-[#22b886] rounded-full rounded-tl-none flex items-center justify-center">
                <ChartNoAxesCombined color="#ecf0f3" size={18} />
              </div>
              <p className="text-[10px] lg:text-sm">Graphs Insights</p>
            </div>
          </div>

          {/* left hand side */}
          <div className="absolute -left-10 h-full lg:h-[90%] w-8 flex flex-col justify-between">
            <div className="flex flex-col items-end">
              <div className=" size-8 bg-[#22b886] rounded-full rounded-br-none flex items-center justify-center">
                <Radio color="#ecf0f3" size={18} />
              </div>
              <p className="text-[10px] lg:text-sm text-right">
                Easy to use
              </p>
            </div>

            <div className="flex flex-col items-end">
              <div className="size-8 bg-[#22b886] rounded-full rounded-r-none flex items-center justify-center">
                <MonitorCog color="#ecf0f3" size={18} />
              </div>
              <p className="text-[10px] lg:text-sm text-right">
                Manage Settings
              </p>
            </div>

            <div className="flex flex-col items-end">
              <div className="size-8 bg-[#22b886] rounded-full rounded-tr-none flex items-center justify-center">
                <Droplets color="#ecf0f3" size={18} />
              </div>
              <p className="text-[10px] lg:text-sm text-right">Live Humidity</p>
            </div>
          </div>

          <div className="relative w-[50%] aspect-square flex items-center justify-center">
            <div className="absolute w-[98%] bg-green-500 bg-opacity-0 aspect-square rounded-full border animate-spin border-dashed border-black flex items-center justify-center">
              {/* <House fill="#22b886" size={30} /> */}
            </div>

            <div className="w-[80%] aspect-square rounded-full border border-dashed border-black flex items-center justify-center animate-pulse">
              <House fill="#22b886" size={30} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 lg:mx-auto bg-[#22b886] rounded-md h-10 flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={goToDashboard}
            className=" rounded-md size-full hover:bg-opacity-80 text-[#ecf0f3]"
          >
            Go to dashboard
          </button>
        )}
      </div>
    </main>
  );
}
