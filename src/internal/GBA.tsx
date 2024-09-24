import { Plugin } from "@/lib/types"
import { Gamepad } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const gba: Plugin = {
  name: "GBA",
  id: "bunker.gba",
  description: "Run the GBA emulator",
  icon: Gamepad,

  page({ sdk }) {
    console.log(sdk.plugins.isInstalled("bunker.gba"))
    const fullScreen = () => {
      const iframe = document.getElementById("framey") as HTMLIFrameElement
      iframe.requestFullscreen()
    }

    const [url, setUrl] = useState("https://ilovemath.pics/")
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-2">
        <div className="w-[92%] h-[92%]">
          <iframe
            allow="fullscreen"
            id="framey"
            className="border-8 border-secondary w-full h-full"
            src={url}
          />
        </div>
        <div className="flex justify-center mt-1">
          <Button className="p-2 mr-1" variant="outline" onClick={fullScreen}>
            <Maximize2 />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Select GBA Version</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setUrl("https://mathstudy.dev/gba")
                }}
              >
                2.0
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUrl("https://ilovemath.pics/")
                }}
              >
                3.0
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  },
}

export default gba
