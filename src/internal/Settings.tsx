import { Plugin } from "@/lib/types"
import bunker from "@/lib/bunker"
import { Settings2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"

const Settings: Plugin = {
  name: "Settings",
  id: "bunker.settings",
  description: "Modify Bunker & Other apps settings!",
  icon: Settings2,

  page({ sdk }) {
    function setStorageLocation(checked: boolean) {
      if (checked) {
        sdk.config.set("pluginLocation", "internal")
      } else {
        sdk.config.set("pluginLocation", "external")
      }
    }
    return (
        <div className="flex flex-col items-center w-full pt-16">
            <h1 className="font-bold text-5xl">Settings </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Switch id="storage-location" onCheckedChange={(checked) => setStorageLocation(checked)} />
                <Label className="text-md" htmlFor="storage-location">Store Plugins Internally</Label>
            </div>
        </div>
    )
  },


  onReady() {
    console.log("Status")
  },
}

export default Settings
