import { SDK } from "./sdk"
let version: string = "v0.2.4"
let pluginLocation: string = "internal"
let autoUpdate: string = "true"



let Settings = new SDK("bunker.settings")


pluginLocation = Settings.config.get("storageLocation") || pluginLocation
// @ts-ignore
autoUpdate = Settings.config.get("autoUpdate") || autoUpdate;

const bunker = {
  version,
  pluginLocation,
  autoUpdate,
}
export default bunker
