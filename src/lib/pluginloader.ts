import React from 'react'
import store from 'store2'
import { toast } from 'sonner'
import { LucideIcon } from 'lucide-react'
import { atom } from 'nanostores'

store.set('savedPlugins', [], false)
store.set('disabledPlugins', [], false)

export interface Plugin {
  name: string
  id: string
  disabled?: boolean
  description?: string
  icon?: LucideIcon

  navPosition?: 'top' | 'bottom'
  tile?: () => React.ReactElement
  page?: () => React.ReactElement

  onReady?: () => void
}

export const $plugins = atom<Plugin[]>([])

export function readyEvent() {
  $plugins.get().forEach((plugin) => {
    if (!plugin.onReady) return
    plugin.onReady()
  })
}

function internalUpdate() {
  // store('disabledPlugins').forEach((id: string) => {
  //   const plugins = $plugins.get()
  //   const index = plugins.findIndex((plugin) => plugin.id == id)
  //   const selectedPlugin = plugins[index]
  //   if (!selectedPlugin) return
  //   selectedPlugin.disabled = true
  // })
}

function getSavedPlugins() {
  return store('savedPlugins') as string[]
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

  if (store('disabledPlugins').includes(id)) {
    var updated = store('disabledPlugins').filter(() => !store('disabledPlugins').includes(id))
    if (!updated[0]) store('disabledPlugins', [])
    else store('disabledPlugins', [updated])
  } else {
    store('disabledPlugins', [...store('disabledPlugins'), id])
  }

  internalUpdate()
  return
}

import iFramer from '@/internal/Viewer'
import Status from '@/internal/Status'

export function registerDefaultPlugins() {
  registerPlugin(Status)
  registerPlugin(iFramer)
}

getSavedPlugins().forEach(async (url) => {
  const loadedPlugin = await fetchExternalPlugin(url)
  if (!loadedPlugin) return
  registerPlugin(loadedPlugin)
})

export function registerPlugin(plugin: Plugin): Plugin | undefined | void {
  if (!plugin) return;

  const plugins = $plugins.get()

  if (plugins.find((existingPlugin) => existingPlugin.id == plugin.id)) {
    toast.error(`An error occured while registering ${plugin.id} - plugin identifier already registered.`)
    return
  }

  $plugins.set([...$plugins.get(), plugin])
  console.log(plugin)

  if (plugin.onReady) plugin.onReady()
  internalUpdate()

  return plugin
}

export async function fetchExternalPlugin(url: string): Promise<Plugin | undefined> {
  const response = await fetch(url)
  const code = await response.text()
  const blob = new Blob([code], { type: 'text/javascript' })
  const path = URL.createObjectURL(blob)

  const module = await import(/* @vite-ignore */ path)

  if (typeof module.default !== 'object' || !('name' in module.default)) {
    toast.error(`No valid plugin exists for ${url}`)
    return
  }

  const plugin = module.default as Plugin

  if (plugin.id.startsWith('bunker.')) {
    toast.error(`An error occured while fetching ${plugin.id} - external plugin identifier cannot be in the bunker namespace.`)
    return
  }

  return plugin
}
