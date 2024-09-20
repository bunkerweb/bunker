import { SDK } from "./sdk"
let version = "v0.2.3"
let pluginLocation = "internal"
let Settings = new SDK("bunker.settings")

pluginLocation = Settings.config.get("storageLocation")  || pluginLocation

const bunker = {
  version,
  pluginLocation,
}
export default bunker
