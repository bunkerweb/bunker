import { Plugin } from "@/lib/types";
import { Gamepad } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const gba: Plugin = {
  name: "GBA",
  id: "bunker.gba",
  description: "Run the GBA emulator",
  icon: Gamepad,

  page() {
    const [url, setUrl] = useState("https://ilovemath.pics/");
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-2">
        <div className="w-[92%] h-[92%]">
          <iframe
            id="iframe"
            className="border-8 border-secondary w-full h-full"
            src={url}
          />
        </div>
        <div className="flex justify-center mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Select GBA Version</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setUrl("https://cattn.github.io/gba");
                }}
              >
                1.0
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUrl("https://math-study.github.io/gba");
                }}
              >
                2.0
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUrl("https://ilovemath.pics/");
                }}
              >
                3.0
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  },
};

export default gba;
