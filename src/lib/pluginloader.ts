import React from 'react'
import store from 'store2'
import { toast } from 'sonner'
import EventEmitter from 'events'

import iFramer from '@/internal/iFramer'
import Status from '@/internal/Status'
import HackerNews from '@/internal/HackerNews'

store.set('savedPlugins', [], false)
store.set('disabledPlugins', [], false)

export interface Plugin {
  name: string
  id: string
  disabled?: boolean
  description?: string

  navPosition?: 'top' | 'bottom'
  tile?: () => React.ReactElement
  page?: () => React.ReactElement
}

export const plugins: Plugin[] = []
export const pluginEventEmitter = new EventEmitter()

function internalUpdate() {
  store('disabledPlugins').forEach((id: string) => {
    const index = plugins.findIndex((plugin) => plugin.id == id)
    const selectedPlugin = plugins[index]
    if (!selectedPlugin) return

    selectedPlugin.disabled = true
  })
}

function getSavedPlugins() {
  return store('savedPlugins') as string[]
}

export function togglePluginDisable(id: string) {
  const index = plugins.findIndex((plugin) => plugin.id == id)
  const selectedPlugin = plugins[index]
  if (!selectedPlugin) return

  selectedPlugin.disabled = !selectedPlugin.disabled

  if (store('disabledPlugins').includes(id)) {
    var updated = store('disabledPlugins').filter(() => !store('disabledPlugins').includes(id))
    if (!updated[0]) store('disabledPlugins', [])
    else store('disabledPlugins', [updated])
  } else {
    store('disabledPlugins', [...store('disabledPlugins'), id])
  }

  pluginEventEmitter.emit('pluginUpdate')
  internalUpdate()
  return selectedPlugin.disabled
}

export function registerDefaultPlugins() {
  registerPlugin(Status)
  registerPlugin(iFramer)
  registerPlugin(HackerNews)
}

getSavedPlugins().forEach(async (url) => {
  const loadedPlugin = await fetchExternalPlugin(url)
  if (!loadedPlugin) return
  registerPlugin(loadedPlugin)
})

export function registerPlugin(plugin: Plugin): Plugin | undefined | void {
  if (!plugin) return

  if (plugins.find((existingPlugin) => existingPlugin.id == plugin.id)) {
    toast.error(`An error occured while registering ${plugin.id} - plugin identifier already taken.`)
    return
  }

  plugins.push(plugin)
  pluginEventEmitter.emit('pluginUpdate', plugin)
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
    toast.error(`An error occured while registering ${plugin.id} - external plugin identifier cannot start with "bunker.".`)
    return
  }

  return plugin
}
