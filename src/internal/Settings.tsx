import { Plugin } from "@/lib/types"
import { Settings2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { useState } from "react"

const Settings: Plugin = {
  name: "Settings",
  id: "bunker.settings",
  description: "Modify Bunker & Other apps settings!",
  icon: Settings2,

  page({ sdk }) {
    const [pluginLocation, setPluginLocation] = useState(sdk.config.get("storageLocation"));
    const [autoUpdate, setAutoUpdate] = useState(sdk.config.get("autoUpdate") === "true");
    const [notifications, setNotifications] = useState(sdk.config.get("notifications") === "true");
    const [pluginNotifs, setPluginNotifs] = useState(sdk.config.get("pluginNotifs") === "true");
    function setStorageLocation(checked: boolean) {
      if (checked) {
        sdk.config.set("storageLocation", "internal")
        setPluginLocation("internal");
      } else {
        sdk.config.set("storageLocation", "external")
        setPluginLocation("external");
      }
    }

    function autoUpdateSet(checked: boolean) {
      if (checked) {
        sdk.config.set("autoUpdate", "true")
        setAutoUpdate(true);
      } else {
        sdk.config.set("autoUpdate", "false")
        setAutoUpdate(false);
      }
    }

    function notificationSet(checked: boolean) {
      if (checked) {
        sdk.config.set("notifications", "true")
        setNotifications(true);
      } else {
        sdk.config.set("notifications", "false")
        setNotifications(false);
      }
    }

    function pluginNotifSet(checked: boolean) {
      if (checked) {
        sdk.config.set("pluginNotifs", "true")
        setPluginNotifs(true);
      } else {
        sdk.config.set("pluginNotifs", "false")
        setPluginNotifs(false);
      }
    }


    return (
        <div className="flex flex-col items-center w-full pt-16">
            <h1 className="font-bold text-5xl">Settings </h1>
            <div className="flex flex-col justify-center gap-4 mt-8">
            <div className="flex flex-row items-center gap-4 mt-8">
                <Switch id="storage-location" checked={pluginLocation === "internal"} onCheckedChange={(checked) => setStorageLocation(checked)} />
                <Label className="text-md" htmlFor="storage-location">Store Plugins Internally</Label>
            </div>
            <div className="flex flex-row items-center gap-4 mt-2">
                <Switch id="auto-update" checked={autoUpdate} onCheckedChange={(checked) => autoUpdateSet(checked)} />
                <Label className="text-md" htmlFor="auto-update">Auto Update</Label>
            </div>
            <div className="flex flex-row items-center gap-4 mt-2">
                <Switch id="notifications" checked={notifications} onCheckedChange={(checked) => notificationSet(checked)} />
                <Label className="text-md" htmlFor="notifications">Disable All Notifications</Label>
            </div>
            <div className="flex flex-row items-center gap-4 mt-2">
                <Switch id="pluginNotif" checked={pluginNotifs} onCheckedChange={(checked) => pluginNotifSet(checked)} />
                <Label className="text-md" htmlFor="pluginNotif">Disable Notifications from Plugins</Label>
            </div>
            </div>
        </div>
    )
  },


  onReady() {
    console.log("Settings")
  },
}

export default Settings
