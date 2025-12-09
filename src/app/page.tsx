"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/ui/animated-shader-hero";
import {
  Battery,
  Wifi,
  Signal,
  MessageSquare,
  Mail,
  Calendar,
  Camera,
  Map,
  Clock,
  Music,
  Settings,
  AppWindow,
  Phone,
  Compass,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [time, setTime] = useState("");
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { name: "Messages", icon: MessageSquare, bg: "bg-gradient-to-b from-green-400 to-green-600" },
    { name: "Mail", icon: Mail, bg: "bg-gradient-to-b from-blue-400 to-blue-600" },
    { name: "Calendar", icon: Calendar, bg: "bg-white" }, // Calendar is special
    { name: "Photos", icon: Camera, bg: "bg-white" }, // Photos is special
    { name: "Maps", icon: Map, bg: "bg-gradient-to-b from-yellow-100 to-yellow-300" }, // Maps placeholder
    { name: "Clock", icon: Clock, bg: "bg-black" },
    { name: "Music", icon: Music, bg: "bg-gradient-to-b from-orange-400 to-red-600" },
    { name: "Settings", icon: Settings, bg: "bg-gradient-to-b from-gray-300 to-gray-500" },
    { name: "App Store", icon: AppWindow, bg: "bg-gradient-to-b from-blue-500 to-blue-700" },
  ];

  const dockApps = [
    { name: "Phone", icon: Phone, bg: "bg-gradient-to-b from-green-400 to-green-600" },
    { name: "Safari", icon: Compass, bg: "bg-gradient-to-b from-blue-300 to-blue-500" },
    { name: "Messages", icon: MessageSquare, bg: "bg-gradient-to-b from-green-400 to-green-600" },
    { name: "Music", icon: Music, bg: "bg-gradient-to-b from-orange-400 to-red-600" },
  ];
  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });

    let effect: { destroy?: () => void } | undefined;

    const initVanta = async (): Promise<void> => {
      try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js");
        const VANTA = (window as typeof window & { VANTA?: any }).VANTA;
        if (VANTA?.CLOUDS && vantaRef.current) {
          effect = VANTA.CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x87CEEB,
            cloudColor: 0xbec7e1,
            cloudShadowColor: 0x7a6187,
            speed: 1.60
          });
        }
      } catch (error) {
        console.error("加载 Vanta 失败", error);
      }
    };

    void initVanta();

    return () => {
      if (effect?.destroy) effect.destroy();
    };
  }, []);
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [time]);
  return (

    <div
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center bg-zinc-900 p-8 font-sans relative"
    >
      <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold nowrap" style={{ fontFamily: 'cursive' }}>
        Welcome to our website
        <div>
          {time}
        </div>
      </div>
      {/* <Hero
        // headline={{ line1: "Welcome to", line2: "My Website" }}
        headline={{ line1: "", line2: "" }}
        subtitle="This is a subtitle"
        buttons={{ primary: { text: "Get Started", onClick: () => { console.log("Get Started") } } }}
      > */}
      {/* <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 p-4 text-white">
          <div>Welcome to our website</div>
          <div>this time is {time2}</div>
        </div> */}
      {/* </Hero> */}
    </div >
  );
}
