import Home from "./routes/home";
import { Toaster } from "./components/ui/sonner";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./styles.css";

window.document.documentElement.classList.add("dark");

export default function App() {

  return (
    <div className="flex bg-zinc-900">
      <HashRouter>
        <Toaster position="top-right" />
        <div className="w-[calc(100vw-4rem)] absolute right-0 top-0 h-screen">
          <Routes>
            <Route element={<Home />} path="/" />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
