import { atom } from "nanostores"
import { $plugins } from "./plugins"

interface Setting {
  pluginId: string
  id: string
  name: string
}

interface ExposedFunction {
  pluginId: string
  fnName: string
  fn: Function
}

export class SDK {
  private id: string
  constructor(id: string) {
    this.id = id
  }

  public config = {
    get: (key: string) => {
      const value = localStorage.getItem(`${this.id}.${key}`)
      if (value) {
        return value
      }
    },
    set: (key: string, value: string) => {
      localStorage.setItem(`${this.id}.${key}`, value)
      return value
    },
  }

  public plugins = {
    isInstalled: (pluginId: string) => {
      const plugins = $plugins.get()
      return plugins.some((plugin) => plugin.id === pluginId)
    },
  }
}
