import Home from "./routes/home.tsx";
import Navbar from "./components/Navbar.tsx";
import Store from "./routes/store.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Plugins from "./routes/plugins.tsx";
import { useEffect } from "react";
import { registerDefaultPlugins } from "./lib/plugins.ts";
import PluginRouter from "./routes/pluginrouter.tsx";
import { createRoot } from "react-dom/client";

import "./styles.css";

window.document.documentElement.classList.add("dark");

export default function App() {
  useEffect(() => {
    registerDefaultPlugins();
  }, []);

  return (
    <div className="flex bg-zinc-900">
      <HashRouter>
        <Navbar />
        <Toaster position="top-right" />
        <div className="w-[calc(100vw-4rem)] absolute right-0 top-0 h-screen">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Plugins />} path="/plugins" />
            <Route element={<PluginRouter />} path="/plugin/:plugin" />
            <Route element={<Store />} path="/store" />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
