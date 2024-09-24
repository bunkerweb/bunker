import { SDK } from "./sdk"
let version: string = "v0.2.5"
let pluginLocation: string = "internal"
let autoUpdate: string = "true"
let notifications: string = "false" // True = disable all notifications, false = enable all
let pluginNotifs: string = "true" // True = enabled plugin notifications, false = disabled plugin notifications
let title: string = "Bunker"

let Settings = new SDK("bunker.settings")

pluginLocation = Settings.config.get("storageLocation") || pluginLocation
// @ts-ignore
autoUpdate = Settings.config.get("autoUpdate") || autoUpdate

// @ts-ignore
notifications = Settings.config.get("notifications") || notifications

// @ts-ignore
pluginNotifs = Settings.config.get("pluginNotifs") || pluginNotifs

// @ts-ignore
title = Settings.config.get("title") || title

const bunker = {
  version,
  pluginLocation,
  autoUpdate,
  notifications,
  pluginNotifs,
  title,
}
export default bunker
