import store from "store2"
import { toast } from "sonner"
import { atom } from "nanostores"
import type { Plugin } from "./types"
import { SDK } from "./sdk"

store.set("savedPlugins", [], false)
store.set("disabledPlugins", [], false)

export const $plugins = atom<Plugin[]>([])

export function readyEvent() {
  $plugins.get().forEach((plugin) => {
    if (!plugin.onReady) return
    plugin.onReady({ sdk: new SDK(plugin.id) })
  })
}

function getSavedPlugins() {
  return store("savedPlugins") as string[]
}

export function togglePluginDisable(id: string) {
  const plugins = $plugins.get()

  const updatedPlugins = plugins.map((item) => {
    if (item.id === id) {
      return { ...item, disabled: !item.disabled }
    } else {
      return item
    }
  })

  $plugins.set(updatedPlugins)

  if (store("disabledPlugins").includes(id)) {
    var updated = store("disabledPlugins").filter(
      () => !store("disabledPlugins").includes(id),
    )
    if (!updated[0]) store("disabledPlugins", [])
    else store("disabledPlugins", [updated])
  } else {
    store("disabledPlugins", [...store("disabledPlugins"), id])
  }
  return
}

import Viewer from "@/internal/Viewer"
import Status from "@/internal/Status"
import gba from "@/internal/GBA"
import Updater from "@/internal/Updater"
import bunker from "@/lib/bunker"
import { get, set, del } from "idb-keyval"

export function registerDefaultPlugins() {
  registerPlugin(Status)
  registerPlugin(Viewer)
  registerPlugin(gba)
  registerPlugin(Updater)
}

export function removePlugin(id: string) {
  const plugin = $plugins.get().find((p) => p.id == id)
  if (!plugin) return
  if (bunker.pluginLocation == "internal") {
    // @ts-ignore
    del(plugin.source)
  }

  const updated = $plugins.get().filter((p) => p.id !== id)
  $plugins.set(updated)

  if ("source" in plugin) {
    store(
      "savedPlugins",
      (store("savedPlugins") as string[]).filter((s) => s !== plugin.source),
    )
  }
}

getSavedPlugins().forEach(async (url) => {
  if (bunker.pluginLocation == "internal") {
    get(url).then(async (value: Blob | undefined) => {
      if (!value) return
      const path = URL.createObjectURL(value)
      const module = await import(/* @vite-ignore */ path)
      const plugin = module.default as Plugin
      registerPlugin({
        ...plugin,
        source: url,
      })

      console.log("Loaded plugin from storage.")
    })
  } else {
    const loadedPlugin = await fetchExternalPlugin(url)
    if (!loadedPlugin) return
    registerPlugin({
      ...loadedPlugin,
      source: url,
    })

    console.log("Loaded plugin from URL")
  }
})

export function registerPlugin(plugin: Plugin): Plugin | undefined | void {
  if (!plugin) return

  const plugins = $plugins.get()

  if (plugins.find((existingPlugin) => existingPlugin.id == plugin.id)) {
    toast.error(
      `An error occured while registering ${plugin.id} - plugin identifier already registered.`,
    )
    return
  }

  $plugins.set([...$plugins.get(), plugin])
  console.log(plugin)

  if (plugin.onReady) plugin.onReady({ sdk: new SDK(plugin.id) })
  return plugin
}

export async function fetchExternalPlugin(
  url: string,
): Promise<Plugin | undefined> {
  const response = await fetch(url)
  const code = await response.text()
  const blob = new Blob([code], { type: "text/javascript" })
  const path = URL.createObjectURL(blob)
  if (bunker.pluginLocation == "internal") {
    set(url, blob)
  }

  const module = await import(/* @vite-ignore */ path)

  if (typeof module.default !== "object" || !("name" in module.default)) {
    toast.error(`No valid plugin exists for ${url}`)
    return
  }

  const plugin = module.default as Plugin

  if (plugin.id.startsWith("bunker.")) {
    toast.error(
      `An error occured while fetching ${plugin.id} - external plugin identifier cannot be in the bunker namespace.`,
    )
    return
  }

  return plugin
}
