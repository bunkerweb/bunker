import { Home, LayoutGrid, Library, Settings } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { $plugins } from "@/lib/plugins";
import { useStore } from "@nanostores/react";
export default function Navbar() {
  const loadedPlugins = useStore($plugins);
  const navItems = [
    {
      icon: (
        <Home className="group-active:scale-90 transition-all duration-300 text-2xl" />
      ),
      tooltip: "Home",
      href: "/",
      position: "top",
    },
    {
      icon: (
        <Library className="bx bx-user group-active:scale-90 transition-all duration-300 text-2xl" />
      ),
      tooltip: "Store",
      href: "/store",
    },
    {
      icon: (
        <LayoutGrid className="bx bx-user group-active:scale-90 transition-all duration-300 text-2xl" />
      ),
      tooltip: "Plugins",
      href: "/plugins",
      position: "top",
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <TooltipProvider>
      <div className="w-16 h-screen bg-zinc-800 flex flex-col justify-between fixed left-0 top-0 z-40">
        <div>
          <div className="font-extrabold text-3xl bg-zinc-700 aspect-square m-3 rounded-lg flex items-center justify-center cursor-pointer">
            B
          </div>
          {navItems.map((item, index) => {
            return (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      navigate(item.href);
                    }}
                    className={`font-bold hover:bg-zinc-700 ${location.pathname == item.href && "bg-zinc-600"} transition-colors duration-150 aspect-square flex items-center justify-center cursor-pointer group`}
                  >
                    {item.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
          {loadedPlugins.map((item, i) => {
            if (!item.page || !item.icon || item.disabled) return;
            return (
              <Tooltip key={i} delayDuration={0}>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => {
                      navigate(`/plugin/${item.id}`);
                    }}
                    className={`font-bold hover:bg-zinc-700 ${location.pathname == `/plugin/${item.id}` && "bg-zinc-600"} transition-colors duration-150 aspect-square flex items-center justify-center cursor-pointer group`}
                  >
                    <item.icon className="bx bx-user group-active:scale-90 transition-all duration-300 text-2xl" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div>
          {/* <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="font-bold hover:bg-zinc-700 transition-colors duration-150 aspect-square flex items-center justify-center cursor-pointer group">
                <LogOut className="group-active:scale-90 transition-all duration-300" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Exit Safely</p>
            </TooltipContent>
          </Tooltip> */}
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="font-bold hover:bg-zinc-700 transition-colors duration-150 aspect-square flex items-center justify-center cursor-pointer group">
                <Settings className="group-active:scale-90 transition-all duration-300" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
