"use client";

import BlurCardLabel from "@/components/blur-card-label";
import Activity from "@/svgs/activity";
import BreakDown from "@/svgs/breakDown";
import Fire from "@/svgs/fire";
import SummaryChart from "@/svgs/summaryChart";
import Logo from "@/svgs/tallyLogo";
import Trend from "@/svgs/trend";
import { UserReportType } from "@/types";
import getKeyTypeBreakdown from "@/utils/getKeyTypeBreakdown";
import getTodayActivityOverview from "@/utils/getTodayActivityOverview";
import getUserEmail from "@/utils/getUserEmail";
import getUserReports from "@/utils/getUserReport";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getEachDayCount from "@/utils/getEachDayCount";
import { MoveLeft, MoveRight, Send } from "lucide-react";
import getEachWeekCount from "@/utils/getEachWeekCount";
import { useRouter } from "next/navigation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [userReport, setUserReport] = useState<UserReportType[] | []>([]);
  const [dailyBarData, setDailyBarData] = useState<number[] | []>([]);
  const [weeklyBarData, setWeeklyBarData] = useState<number[] | []>([]);
  const [dailyDate, setDailyDate] = useState(moment().format("YYYY-M-D"));
  const [weeklyDate, setWeeklyDate] = useState(moment().startOf("week"));

  async function executeAsyncCalls() {
    let reports = await getUserReports();
    console.log({ reports });
    setUserReport(reports);
  }

  useEffect(() => {

    let storedEmail = getUserEmail();
    if (storedEmail && storedEmail.length > 0) {
      setEmail(getUserEmail());
    } else {
      alert("Provide an email on login")
      router.push("/")
    }
    
    executeAsyncCalls();
  }, []);

  useEffect(() => {
    setDailyBarData(getEachDayCount(userReport, dailyDate));
    setWeeklyBarData(getEachWeekCount(userReport, weeklyDate));
  }, [userReport, dailyDate, weeklyDate]);

  const dailyBarChartData = {
    labels: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "cut",
      "delete",
      "paste",
      "space",
    ],
    datasets: [
      {
        label: "No of times this key/action was taken",
        backgroundColor: "#edff8c",
        data: dailyBarData,
      },
    ],
  };

  const weeklyBarChartData = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
    datasets: [
      {
        label: "Total Key Press Per Day",
        backgroundColor: "#edff8c",
        data: weeklyBarData,
      },
    ],
  };

  const barChartOption = {
    maintainAspectRatio: false,
    responsive: true,
  };

  function prevDay() {
    let prevDay = moment(dailyDate).subtract(1, "days").format("YYYY-M-D");
    setDailyDate(prevDay);
  }

  function nextDay() {
    let nextDay = moment(dailyDate).add(1, "days").format("YYYY-M-D");
    setDailyDate(nextDay);
  }

  function prevWeek() {
    let prevWeek = moment(weeklyDate).subtract(1, "weeks");
    setWeeklyDate(prevWeek);
  }

  function nextWeek() {
    let nextWeek = moment(weeklyDate).add(1, "weeks");
    setWeeklyDate(nextWeek);
  }

  function search() {
    let input = document.getElementById("search") as HTMLInputElement;
    if (input) {
      let value = input.value;
      let isValidDate = moment(value, "YYYY-M-D", true).isValid();

      if (isValidDate) {
        setDailyDate(value);
        setWeeklyDate(moment(value, "YYYY-M-D").startOf("week"));
      } else {
        alert("Invalid Date Format");
        input.value = "";
        return;
      }
    }
  }

  if (userReport.length === 0) {
    return (
      <div className="bg-[#0A0A0A] h-screen w-full flex flex-col gap-5 items-center justify-center">
        <Link href="/" className="flex items-center">
          <div className="size-10">
            <Logo fill="#EDFF8C" stroke="#000000" />
          </div>
          <p className="text-[#EDEDED] font-bold first-letter:italic first-letter:text-xl">
            KeyCount{" "}
          </p>
        </Link>

        <p className="text-[#EDEDED]">
          No data to display for <span className="text-[#EDFF8C]">{email}</span>
        </p>

        <div>
          <Link
            href="/"
            className="w-full h-12 rounded-lg bg-[#EDFF8C] hover:bg-[#EDFF8C]/85 text-black font-medium flex items-center justify-center px-4"
          >
            Go To Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen w-full p-5 xs:max-md:p-2">
      <div className="flex flex-col size-full border rounded-lg bg-[#e9eeea] p-5 xs:max-md:p-3">
        <header className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="size-8">
              <Logo fill="#EDFF8C" stroke="#000000" />
            </div>
            <p className="font-bold first-letter:italic first-letter:text-xl">
              KeyCount{" "}
            </p>
          </Link>
          <div className="flex items-center gap-2 xs:max-md:hidden">
            <p className="">
              <Link
                className="px-5 py-2 border rounded-full bg-white/30 hover:bg-white/70 transition-all text-black text-sm font-light"
                href="/"
              >
                Home
              </Link>
            </p>
            <p className="px-5 py-2 border rounded-full bg-black text-white text-sm font-light">
              Analytics Dashboard
            </p>
            <div className="relative">
              <div className="absolute top-[10%] h-[80%] rounded-full bg-[#EDFF8C] hover:bg-green-500 right-1 flex items-center justify-center text-xs">
                <button onClick={search} className="size-full px-2">
                  Search
                </button>
                {/* <Send size={20}  /> */}
              </div>
              <input
                id="search"
                placeholder={moment().format("YYYY-M-D")}
                className="px-5 py-2 border rounded-full text-sm font-light bg-transparent focus-within:outline-black/10 text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          <p>{email}</p>
        </header>
        <section className="mt-5 xs:max-md:mt-5 h-full w-full flex flex-col">
          <div>
            <h1 className="text-4xl xs:max-md:text-3xl font-light">
              Keyboard Activities
            </h1>
            <div className="relative mt-2 hidden xs:max-md:block w-60 border border-black/10 rounded-full">
              <div className="absolute top-[10%] h-[80%] rounded-full bg-[#EDFF8C] hover:bg-green-500 right-0 flex items-center justify-center text-xs">
                <button onClick={search} className="size-full px-2">
                  Search
                </button>
                {/* <Send size={20}  /> */}
              </div>
              <input
                id="search"
                placeholder={moment().format("YYYY-M-D")}
                className="px-5 py-2 text-sm font-light bg-transparent focus-within:outline-none text-slate-700"
              />
            </div>
          </div>

          <div className="mt-5 xs:max-md:mt-5 relative flex w-full h-full gap-5">
            <div className="absolute h-full right-0 left-0 flex xs:max-md:flex-col gap-2">
              {/* LEFT */}
              <div className="relative z-10 w-[20%] min-w-80 xs:max-md:w-full xs:max-md:min-w-0 h-full overflow-auto noScrollbar  bg-[#cfe1ca] rounded-t-2xl">
                <div className="absolute top-0 -z-10 w-full h-80">
                  <Image
                    fill={true}
                    src="/wireframe.png"
                    alt="wireframe image"
                    className="object-contain object-top"
                  />
                </div>
                <div className="relative z-10 space-y-1 h-full overflow-auto noScrollbar pt-40 flex flex-col">
                  <div className="w-full xs:max-md:max-w-80 h-auto bg-[#edff8c] rounded-full flex justify-between items-center p-2">
                    <div className=" ml-2 text-xs">
                      <p>Analyze your typing patterns and habit.</p>
                      <p>Watch the trend</p>
                    </div>
                    <div className="size-10 rounded-full bg-black p-2 flex items-center justify-center">
                      <Trend fill="#FFFFFF" />
                    </div>
                  </div>
                  <div className="space-y-5">
                    {/* first */}
                    <div className="w-full py-5 px-2 bg-white/30 rounded-xl backdrop-blur-md">
                      <BlurCardLabel
                        svg={<SummaryChart fill="none" stroke="#000000" />}
                        label={`${moment(dailyDate).format(
                          "ll"
                        )} Activity Overview`}
                        introText="Today's Typing activity:"
                        subText={
                          getTodayActivityOverview(userReport, dailyDate)
                            .activityDifference
                        }
                      />

                      <div className="space-y-2 mt-5">
                        <p className="text-sm font-light">
                          Total Key Presses:
                          <span className="stat-label ml-2">
                            {
                              getTodayActivityOverview(userReport, dailyDate)
                                .todayTotalKeyPresses
                            }
                          </span>
                        </p>
                        <p className="text-sm font-light">
                          Avg. Key Presses Per Minute:
                          <span className="stat-label ml-2">
                            {getTodayActivityOverview(
                              userReport,
                              dailyDate
                            ).todayAvgKeyPressPerMinute.toFixed(2)}
                          </span>
                        </p>
                        <p className="text-sm font-light">
                          Most active folder of day:
                          <span className="stat-label ml-2">
                            {
                              getTodayActivityOverview(userReport, dailyDate)
                                .todayActiveFolder
                            }
                          </span>
                        </p>
                        <p className="text-sm font-light">
                          Most Frequently Pressed Key/Action:
                          <span className="stat-label ml-2">
                            {
                              getTodayActivityOverview(userReport, dailyDate)
                                .todayMostPressedKey
                            }
                          </span>
                        </p>
                        <p className="text-sm font-light">
                          Least Frequently Pressed Key:
                          <span className="stat-label ml-2">
                            {
                              getTodayActivityOverview(userReport, dailyDate)
                                .todayLeastPressedKey
                            }
                          </span>
                        </p>
                        <p className="text-sm font-light">
                          Top 5 Keys Pressed/Action Taken:
                          <span className="stat-label ml-2">
                            {getTodayActivityOverview(userReport, dailyDate)
                              .todayTop5Keys.slice(0, 5)
                              .map((key) => (key === " " ? "Space" : key))
                              .join(", ")}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Second */}
                    <div className="w-full py-5 px-2 bg-white/30 rounded-xl backdrop-blur-md">
                      <BlurCardLabel
                        svg={<BreakDown fill="none" stroke="#000000" />}
                        label={`${moment(dailyDate).format(
                          "ll"
                        )} Key Type Breakdown`}
                        introText="Distribution of Key Types across Categories"
                        subText=""
                      />
                      <div className="space-y-2 mt-5">
                        <div>
                          <p>Alphabetic Keys Usage</p>
                          <p className="text-sm font-light">
                            Total Key Presses:
                            <span className="stat-label ml-2">
                              {
                                getKeyTypeBreakdown(userReport, dailyDate)
                                  .alphabetCount
                              }
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Numeric Keys Usage</p>
                          <p className="text-sm font-light">
                            Total Key Presses:
                            <span className="stat-label ml-2">
                              {
                                getKeyTypeBreakdown(userReport, dailyDate)
                                  .numericCount
                              }
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Cut Action Usage</p>
                          <p className="text-sm font-light">
                            Total Action Taken:
                            <span className="stat-label ml-2">
                              {
                                getKeyTypeBreakdown(userReport, dailyDate)
                                  .cutCount
                              }
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Delete Action Usage</p>
                          <p className="text-sm font-light">
                            Total Action Taken:
                            <span className="stat-label ml-2">
                              {
                                getKeyTypeBreakdown(userReport, dailyDate)
                                  .deleteCount
                              }
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Space-Bar Action Usage</p>
                          <p className="text-sm font-light">
                            Total Action Taken:
                            <span className="stat-label ml-2">
                              {
                                getKeyTypeBreakdown(userReport, dailyDate)
                                  .spaceCount
                              }
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Third */}
                    <div className="w-full py-5 px-2 bg-white/30 rounded-xl backdrop-blur-md">
                      <BlurCardLabel
                        svg={<BreakDown fill="none" stroke="#000000" />}
                        label="All-Time Key Type Breakdown"
                        introText="Distribution of Key Types across Categories"
                        subText=""
                      />
                      <div className="space-y-2 mt-5">
                        <div>
                          <p>Total Keys Presses</p>
                          <p className="text-sm font-light">
                            Total Key Presses:
                            <span className="stat-label ml-2">
                              {userReport.length}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p>Alphabetic Keys Usage</p>
                          <p className="text-sm font-light">
                            Total Key Presses:
                            <span className="stat-label ml-2">
                              {getKeyTypeBreakdown(userReport).alphabetCount}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Numeric Keys Usage</p>
                          <p className="text-sm font-light">
                            Total Key Presses:
                            <span className="stat-label ml-2">
                              {getKeyTypeBreakdown(userReport).numericCount}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Cut Action Usage</p>
                          <p className="text-sm font-light">
                            Total Action Taken:
                            <span className="stat-label ml-2">
                              {getKeyTypeBreakdown(userReport).cutCount}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Delete Action Usage</p>
                          <p className="text-sm font-light">
                            Total Action Taken:
                            <span className="stat-label ml-2">
                              {getKeyTypeBreakdown(userReport).deleteCount}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p>Space-Bar Action Usage</p>
                          <p className="text-sm font-light">
                            Total Action Taken:
                            <span className="stat-label ml-2">
                              {getKeyTypeBreakdown(userReport).spaceCount}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="relative w-[80%] xs:max-md:w-full h-full flex flex-col gap-2 ">
                <div className="absolute size-full overflow-auto xs:max-md:overflow-auto noScrollbar flex flex-col gap-2">
                  <div className="relative flex w-full gap-2 h-1/2 min-h-80 xs:max-md:min-h-80 overflow-x-aut overflow-y-hidden xs:max-md:overflow-auto noScrollbar">
                    <div className="relative flex flex-col gap-5 w-full min-w-[30rem] h-full bg-[#D8DFE9] overflow-x-auto overflow-y-hidden noScrollbar rounded-xl p-2">
                      <BlurCardLabel
                        svg={<Activity fill="none" stroke="#000000" />}
                        label={`Daily Typing Activity for ${moment(
                          dailyDate,
                          "YYYY-M-D"
                        ).format("ll")}`}
                        introText="Daily Keyboard Usage Trend"
                        subText=""
                      />
                      <div className="h-10 w-full flex items-center justify-center gap-5">
                        <button
                          onClick={prevDay}
                          className="size-8 bg-black/20 flex items-center justify-center rounded-full border border-black/20 text-[#edff8c] disabled:text-[#edff8c]/50 disabled:hover:bg-black/20 hover:text-black hover:bg-[#edff8c] transition-all"
                        >
                          <MoveLeft />
                        </button>
                        <button
                          onClick={nextDay}
                          disabled={dailyDate === moment().format("YYYY-M-D")}
                          className="size-8 bg-black/20 flex items-center justify-center rounded-full border border-black/20 text-[#edff8c] disabled:text-[#edff8c]/50 disabled:hover:bg-black/20 hover:text-black hover:bg-[#edff8c] transition-all"
                        >
                          <MoveRight />
                        </button>
                      </div>
                      <div className="w-full h-full mx-auto overflow-auto noScrollbar">
                        <div className="min-w-[80rem] h-full">
                          <Bar
                            data={dailyBarChartData}
                            options={barChartOption}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex w-full gap-2 h-1/2 min-h-80 xs:max-md:min-h-80 overflow-x-auto overflow-y-hidden xs:max-md:overflow-auto noScrollbar ">
                    <div className="w-full min-w-[30rem] flex flex-col h-full overflow-auto border border-[#D8DFE9] rounded-xl p-2 gap-2">
                      <BlurCardLabel
                        svg={<Trend fill="none" stroke="#000000" />}
                        label={`Weekly Typing Activity Trend: ${weeklyDate.format(
                          "ll"
                        )} - ${weeklyDate
                          .clone()
                          .add(6, "days")
                          .format("ll")} `}
                        introText="Weekly Keyboard Usage Trend"
                        subText=""
                      />
                      <div className="h-10 w-full flex items-center justify-center gap-5">
                        <button
                          onClick={prevWeek}
                          className="size-8 bg-black/20 flex items-center justify-center rounded-full border border-black/20 text-[#edff8c] disabled:text-[#edff8c]/50 disabled:hover:bg-black/20 hover:text-black hover:bg-[#edff8c] transition-all"
                        >
                          <MoveLeft />
                        </button>
                        <button
                          onClick={nextWeek}
                          disabled={
                            weeklyDate.format("YYYY-M-D") ===
                            moment().startOf("week").format("YYYY-M-D")
                          }
                          className="size-8 bg-black/20 flex items-center justify-center rounded-full border border-black/20 text-[#edff8c] disabled:text-[#edff8c]/50 disabled:hover:bg-black/20 hover:text-black hover:bg-[#edff8c] transition-all"
                        >
                          <MoveRight />
                        </button>
                      </div>
                      <div className="size-full">
                        <Bar
                          data={weeklyBarChartData}
                          options={barChartOption}
                        />
                      </div>
                    </div>
                    {/* <div className="w-[40%] min-w-96 h-full border border-[#D8DFE9] rounded-xl"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
