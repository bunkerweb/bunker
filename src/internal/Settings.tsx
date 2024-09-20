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
    function setStorageLocation(checked: boolean) {
      if (checked) {
        sdk.config.set("storageLocation", "internal")
        setPluginLocation("internal");
      } else {
        sdk.config.set("storageLocation", "external")
        setPluginLocation("external");
      }
    }

    return (
        <div className="flex flex-col items-center w-full pt-16">
            <h1 className="font-bold text-5xl">Settings </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Switch id="storage-location" checked={pluginLocation === "internal"} onCheckedChange={(checked) => setStorageLocation(checked)} />
                <Label className="text-md" htmlFor="storage-location">Store Plugins Internally</Label>
            </div>
        </div>
    )
  },


  onReady() {
    console.log("Settings")
  },
}

export default Settings
