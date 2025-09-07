"use client";
import React, { useEffect, useState } from "react";

function Spinner() {
  return (
    <div className="flex gap-3 items-center">
      <div className="size-5 border-2 border-[#d4d1d1] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function SettingsPage() {
  const [settings, setSettings] = useState({
    sendEmail: false,
    sendSMS: false,
    email: "elijahdimeji549@gmail.com",
    phone: "07037887923",
  });
  const [edit, setEdit] = useState({
    email: false,
    sms: false,
    type: "",
    value: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://gsms-server.onrender.com/get-settings");
        let message = await response.json();
        setSettings(message.data);
        localStorage.setItem("settings", JSON.stringify(message.data));
        console.log(message);
      } catch (error) {
        let settings = localStorage.getItem("settings");
        if (settings) {
          let castedSettings = JSON.parse(settings) as {
            sendEmail: boolean;
            sendSMS: boolean;
            email: string;
            phone: string;
          };
          setSettings(castedSettings);
        } else {
          setSettings({
            sendEmail: false,
            sendSMS: false,
            email: "elijahdimeji549@gmail.com",
            phone: "07037887923",
          });
        }

        console.error(error);
      }
    })();
  }, []);

  async function updateNotifs(type: "sendEmail" | "sendSMS") {
    

    try {
      const response = await fetch(
        "https://gsms-server.onrender.com/update-notifications-settings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...settings, [type]: !settings[type] }),
        }
      );
      let message = await response.json();
      localStorage.setItem("settings", JSON.stringify(message));
      setSettings({ ...settings, [type]: !settings[type] });
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateEdits(
    _email: boolean,
    _sms: boolean,
    type: string
  ) {
    let email = document.getElementById("emailField") as HTMLInputElement;
    let sms = document.getElementById("smsField") as HTMLInputElement;
    setEdit({ ...edit, email: _email, sms: _sms, type });
    let val = "";
    let body = {}
    if (email && type === "email") {
      val = email.value;
      body = {email: val, phone: settings.phone}
    }
    if (sms && type === "sms") {
      val = sms.value;
      body = { email: settings.email, phone: val }
    }

    if (val) {
   try {
      const response = await fetch(
        "https://gsms-server.onrender.com/update-user-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      let message = await response.json();
      localStorage.setItem("settings", JSON.stringify(message));
      setSettings({ ...settings, ...message.data });
      console.log(message);
    } catch (error) {
      console.error(error);
    }
    }
   

  
  }


  return (
    <div className="px-2 py-5">
      <div className="space-y-5">
        <div className="flex items-center gap-2">
          <p>Receive Email Alerts</p>
          <div
            onClick={() => updateNotifs("sendEmail")}
            className={` ${
              !settings["sendEmail"] ? "bg-red-600" : "bg-gray-800"
            } cursor-pointer transition-all relative flex items-center justify-between text-xs text-white font-medium w-[68px] h-9 px-2 py-1 rounded-full`}
          >
            <p>ON</p>
            <p>OFF</p>
            <button
              className={`${
                !settings["sendEmail"] ? "-translate-x-1" : "translate-x-7"
              } absolute transition-all bg-white size-7 rounded-full`}
            ></button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <p>Receive SMS Alerts</p>
          <div
            onClick={() => updateNotifs("sendSMS")}
            className={` ${
              !settings["sendSMS"] ? "bg-red-600" : "bg-gray-800"
            } ml-1 cursor-pointer transition-all relative flex items-center justify-between text-xs text-white font-medium w-[68px] h-9 px-2 py-1 rounded-full`}
          >
            <p>ON</p>
            <p>OFF</p>
            <button
              className={`${
                !settings["sendSMS"] ? "-translate-x-1" : "translate-x-7"
              } absolute transition-all bg-white size-7 rounded-full`}
            ></button>
          </div>
        </div>

        <div className="">
          <p>Email address for Email Alerts</p>
          <div>
            {edit.email && (
              <div className="flex gap-2 items-center">
                <div>
                  <input
                    id="emailField"
                    autoFocus={true}
                    placeholder="elijahdimeji549@gmail.com"
                    className="border-b w-60 outline-none"
                  />
                </div>
                <button
                  onClick={() => updateEdits(false, false, "email")}
                  className="bg-green-500 p-1 text-sm rounded-md"
                >
                  Save
                </button>
              </div>
            )}

            {!edit.email && (
              <div className="flex gap-2 items-center">
                {" "}
                <p className="text-slate-400">{settings.email}</p>{" "}
                <button
                  onClick={() => updateEdits(true, false, "email")}
                  className="bg-blue-500 p-1 text-sm rounded-md"
                >
                  Edit
                </button>{" "}
              </div>
            )}
          </div>
        </div>

        <div className="">
          <p>Phone number for SMS Alerts</p>
          <div>
            {edit.sms && (
              <div className="flex gap-2 items-center">
                <div>
                  <input
                    id="smsField"
                    autoFocus={true}
                    placeholder="07037887923"
                    maxLength={11}
                    className="border-b w-60 outline-none"
                  />
                </div>
                <button
                  onClick={() => updateEdits(false, false, "sms")}
                  className="bg-green-500 p-1 text-sm rounded-md"
                >
                  Save
                </button>
              </div>
            )}

            {!edit.sms && (
              <div className="flex gap-2 items-center">
                {" "}
                <p className="text-slate-400">{settings.phone}</p>{" "}
                <button
                  onClick={() => updateEdits(false, true, "sms")}
                  className="bg-blue-500 p-1 text-sm rounded-md"
                >
                  Edit
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <p>{JSON.stringify(notifs)}</p> */}
    </div>
  );
}

export default SettingsPage;
