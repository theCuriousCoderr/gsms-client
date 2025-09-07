"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ZoomIn, ZoomOut } from "lucide-react";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import moment from "moment";
import { ChangeEvent, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function Dashboard() {
  const [graphData, setGraphData] = useState({
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00"],
    temps: [1, 2, 3, 4, 5],
    humids: [2, 4, 6, 8, 10],
  });
  const [zoomLevel, setZoomLevel] = useState({ val: 300, str: "w-[10rem]" });
  const [zoomRange, setZoomRange] = useState(500);
  const [sensor, setSensor] = useState({
    timeStamp: 0,
    temperature: 0,
    humidity: 0,
  });
  const [ago, setAgo] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setAgo(Math.random());
    }, 1000);
    let sensorData = localStorage.getItem("sensorData");
    if (sensorData) {
      let castedSensorData = JSON.parse(sensorData) as {
        timeStamp: number;
        temperature: number;
        humidity: number;
      };
      setSensor(castedSensorData);
    } else {
      setSensor({
        timeStamp: 0,
        temperature: 0,
        humidity: 0,
      });
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://gsms-server.onrender.com");
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.event === "sensorUpdate") {
        localStorage.setItem("sensorData", JSON.stringify(msg.data));
        setSensor(msg.data);
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    updateTodayGraph();
  }, [sensor.temperature]);

  async function updateTodayGraph() {
    try {
      // console.log("updateTodayGraph")
      const targetDay = moment().startOf("day").valueOf();
      const nextDay = moment(targetDay).add(1, "day").startOf("day").valueOf();

      const response = await fetch(
        "https://gsms-server.onrender.com/fetch-graph-data/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from: targetDay, to: nextDay }),
        }
      );
      let { timeZone, humids, temps } = await response.json();

      // console.log({ labels: timeZone, temps, humids })
      setGraphData({ labels: timeZone, temps, humids });
    } catch (error) {
      console.log(error);
    }
  }

  function timeAgoPrecise(timestampMs: number) {
    const now = moment();
    const then = moment(timestampMs);

    const diffSeconds = now.diff(then, "seconds");
    const diffMinutes = now.diff(then, "minutes");
    const diffHours = now.diff(then, "hours");

    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else {
      return `${diffHours} hours ago`;
    }
  }

  const dailyBarChartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: "Humidity",
        backgroundColor: "#000000",
        borderColor: "#0000ff",
        data: graphData.humids,
        tension: 0,
        pointRadius: 1,
        borderWidth: 1,
      },
      {
        label: "Temperature",
        backgroundColor: "#000000",
        borderColor: "#ff0000",
        data: graphData.temps,
        tension: 0,
        pointRadius: 1,
        borderWidth: 1,
      },
    ],
  };

  const barChartOption = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true, // 🚫 hides the legend
      },
    },
  };

  async function changeDate(e: ChangeEvent<HTMLInputElement>) {
    try {
      // Validate input
      const dateInput = e.target.value;
      if (!moment(dateInput, "YYYY-MM-DD", true).isValid()) {
        console.error("Invalid date input:", dateInput);
        return;
      }

      // Get start and end of the day
      const targetDay = moment(dateInput).startOf("day").valueOf();
      const nextDay = moment(dateInput).add(1, "day").startOf("day").valueOf();

      // Fetch data

      const response = await fetch(
        "https://gsms-server.onrender.com/fetch-graph-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ from: targetDay, to: nextDay }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { timeZone, humids, temps } = await response.json();
      setGraphData({ labels: timeZone, temps, humids });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }

  function changeZoomRange(e: ChangeEvent<HTMLInputElement>) {
    let newZoomRange = Number(e.target.value);
    setZoomRange(newZoomRange);
  }

  function zoomOutGraph() {
    // +
    let graph = document.getElementById("graph");

    let newZoomValue = zoomLevel.val + zoomRange;
    let newZoomString = `w-[${newZoomValue}rem]`;
    if (graph) {
      graph.classList.value = "";
      graph.classList.add(newZoomString);
    }
    setZoomLevel({ val: newZoomValue, str: newZoomString });
  }

  function zoomInGraph() {
    // alert("y")
    let graph = document.getElementById("graph");
    let newZoomValue = zoomLevel.val - zoomRange;
    if (newZoomValue < 300) newZoomValue = 300;
    let newZoomString = `w-[${newZoomValue}rem]`;
    if (graph) {
      graph.classList.value = "";
      graph.classList.add(newZoomString);
    }
    setZoomLevel({ val: newZoomValue, str: newZoomString });
  }

  return (
    <div className="bg-[#ecf0f3]">
      {/* <h2 className="pl-12 py-2 font-bold text-lg bg-gray-800 text-[#ecf0f3]">
        AI-POWERED GRAIN STORAGE MONITORING DASHBOARD
      </h2> */}
      <div className="m-1 p-1 bg-slate-100">
        {timeAgoPrecise(sensor.timeStamp).includes("seconds") ? (
          <div className="flex items-center gap-1 text-green-600 font-medium">
            <div className="size-3 rounded-full bg-green-600"></div>
            <p>Sensor Online</p>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600 font-medium">
            <div className="size-3 rounded-full bg-red-600"></div>
            <p>Sensor Offline</p>
          </div>
        )}

        <div className="flex items-end ml-1">
          <p className="font-medium text-lg">Last Updated Sensor Readings:</p>
          <div className="ml-2" key={ago}>
            {/* {timeAgoPrecise(sensor.timeStamp).includes("seconds") ? ( */}
            {timeAgoPrecise(sensor.timeStamp)}
            {/* ) : (
              <p>----</p>
            )} */}
          </div>
        </div>
        <div className="flex justify-between gap-2 my-5">
          <div className="bg-white p-5 rounded-md shadow-md w-1/2">
            <p
              className={`${
                sensor.temperature > 30 && "text-red-600"
              } text-3xl font-bold`}
            >
              {sensor.temperature}
              <span className="text-lg font-normal">°C</span>{" "}
            </p>
            <p>Live Temperature</p>
          </div>
          <div className="bg-white p-5 rounded-md shadow-md  w-1/2">
            <p
              className={`${
                sensor.humidity > 70 && "text-red-600"
              } text-3xl font-bold`}
            >
              {sensor.humidity}
              <span className="text-lg font-normal">%</span>{" "}
            </p>
            <p>Live Humidity</p>
          </div>
        </div>
        <div className="fle items-end ml-1">
          {sensor.temperature > 30 && (
            <div>
              <div>
                <p className="font-medium text-lg">Spoilage Risk:</p>
                <p className=" text-red-600 uppercase font-bold">
                  High Temperature
                </p>
              </div>
              <div>
                <p className="font-medium text-lg">
                  Corrective Actions for High Temperature:
                </p>
                <ul className="list-disc list-inside">
                  <li>Activate Cooling Systems</li>
                  <li>
                    Turn on fans or blowers to circulate air and reduce
                    temperature.
                  </li>
                  <li>
                    Use forced aeration to push cool air through the grain bulk.
                  </li>
                  <li>Empty out grains for cooling</li>
                  <li>
                    High temperature may indicate insect infestation. Apply safe
                    fumigation if needed.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {sensor.humidity > 70 && (
            <div>
              <div>
                <p className="font-medium text-lg">Spoilage Risk:</p>
                <p className=" text-red-600 uppercase font-bold">
                  High Humidity
                </p>
              </div>
              <div>
                <p className="font-medium text-lg">
                  Corrective Actions for High Humidity:
                </p>
                <ul className="list-disc list-inside">
                  <li>Open air vents for proper ventilation</li>
                  <li>
                    Activate exhaust fans or dehumidifiers to reduce moisture
                    levels inside the silo.
                  </li>
                  <li>
                    Seal leaks or gaps where moisture can enter, especially
                    during rainy seasons.
                  </li>
                  <li>
                    Transfer grains to a drying unit or use heated aeration to
                    remove excess moisture.
                  </li>
                  <li>Inspect for Condensation</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="w-full mx-auto bg-gray-100 border border-gray-300 rounded-lg p-2 space-y-3">
          <p className="font-medium text">
            Temperature and Humidity Trend Graph
          </p>
          <div>
            <p className="text-gray-700 text-sm">
              Select the date you want to view the trend graph
            </p>
            <input
              onChange={changeDate}
              type="date"
              defaultValue={moment().format("YYYY-MM-DD")}
            />
          </div>

          {graphData.labels.length > 0 ? (
            <div>
              <div className="flex items-center gap-5">
                {/* zoom buttons */}
                <div>
                  <div>
                    <button
                      onClick={zoomOutGraph}
                      className="size-5 rounded-full flex items-center justify-center"
                    >
                      <ZoomIn size={40} />
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={zoomInGraph}
                      className="size-5 rounded-full flex items-center justify-center"
                    >
                      <ZoomOut />
                    </button>
                  </div>
                </div>

                {/* zoom range value */}
                <div>
                  <p className="text-sm text-gray-700">
                    Set Zoom Sensitivity Value
                  </p>
                  <input
                    className=""
                    onChange={changeZoomRange}
                    value={zoomRange}
                  />
                </div>
              </div>
              <div className="w-full mx-auto overflow-auto noScrollbar">
                <div id="graph" className="w-[500rem]">
                  <div
                    id="chartContainer"
                    key={sensor.temperature}
                    style={{
                      width: `${zoomLevel.val}px`,
                      height: "300px",
                      overflowX: "auto",
                    }}
                  >
                    <Line
                      width={zoomLevel.val}
                      key={zoomLevel.str}
                      data={dailyBarChartData}
                      options={barChartOption}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-1 bg-[#0000ff]"></div>
                  <p className="text-xs">Humidity</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-1 bg-[#ff0000]"></div>
                  <p className="text-xs">Temperature</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-10 font-bold text-xl">
              No graph data for this date
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
