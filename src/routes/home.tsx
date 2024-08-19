import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full pt-16">
      <h1 className="font-bold text-5xl">Bunker Installer</h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex flex-col items-center bg-card p-5 rounded-md">
          <h1 className="f text-xl">Select Version</h1>
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <span>Version</span>
                  <span className="text-right">
                    <
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>


              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
