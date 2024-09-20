import { $plugins } from "./plugins"

// interface Setting {
//   pluginId: string
//   id: string
//   name: string
// }

// interface ExposedFunction {
//   pluginId: string
//   fnName: string
//   fn: Function
// }

export class SDK {
  private id: string
  constructor(id: string) {
    this.id = id
  }

  public config = {
    get: (key: string) => {
      console.log(`[${this.id}] Getting config value for key ${key}`)
      const value = localStorage.getItem(`${this.id}.${key}`)
      if (value) {
        return value
      }
    },
    set: (key: string, value: string) => {
      console.log(`[${this.id}] Setting config value for key ${key} to ${value}`)
      localStorage.setItem(`${this.id}.${key}`, value)
      return value
    },
  }

  public plugins = {
    isInstalled: (pluginId: string) => {
      console.log(`[${this.id}] Checking if plugin ${pluginId} is installed`)
      const plugins = $plugins.get()
      return plugins.some((plugin) => plugin.id === pluginId)
    },
  }
}
