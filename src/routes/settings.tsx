import { $plugins } from "@/lib/plugins"
import { SDK } from "@/lib/sdk"
import { useStore } from "@nanostores/react"

export default function Settings() {
  const loadedPlugins = useStore($plugins)
  const plugin = "bunker.settings"

  const selectedPlugin = loadedPlugins.find((selected) => selected.id == plugin)
  if (!selectedPlugin || !selectedPlugin.page)
    return (
      <div className="text-center absolute top-1/2 -translate-y-1/2 w-full text-2xl text-semibold">
        Unable to locate plugin{" "}
        <span className="bg-zinc-800 py-1 px-3 rounded-lg border border-white/25 font-mono text-xl">
          {plugin}
        </span>
      </div>
    )

  return (
    <div className="h-screen w-[calc(100vw-4rem)] overflow-auto">
      <selectedPlugin.page sdk={new SDK(selectedPlugin.id)} />
    </div>
  )
}
