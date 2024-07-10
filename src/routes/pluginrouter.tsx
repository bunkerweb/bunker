import { $plugins } from "@/lib/plugins";
import { useStore } from "@nanostores/react";
import { useParams } from "react-router-dom";

export default function PluginRouter() {
  const loadedPlugins = useStore($plugins);
  const { plugin } = useParams();

  const selectedPlugin = loadedPlugins.find(
    (selected) => selected.id == plugin,
  );
  if (!selectedPlugin || !selectedPlugin.page)
    return (
      <div className="text-center absolute top-1/2 -translate-y-1/2 w-full text-2xl text-semibold">
        Unable to locate plugin{" "}
        <span className="bg-zinc-800 py-1 px-3 rounded-lg border border-white/25 font-mono text-xl">
          {plugin}
        </span>
      </div>
    );

  return (
    <div className="h-screen w-[calc(100vw-4rem)] overflow-auto">
      <selectedPlugin.page />
    </div>
  );
}
