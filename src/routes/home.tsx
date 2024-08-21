import { Button } from "@/components/ui/button";

export default function Home() {

  async function installLatestVersion() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/bunkerweb/bunker/updates/index.html"
      );
      const blob = await response.blob();
        // @ts-ignore
       let d = await window.showDirectoryPicker();
       const bunkerFolder = await d.getDirectoryHandle("bunker", { create: true });
       const fileHandle = await bunkerFolder.getFileHandle("index.html", { create: true });
       const wf = await fileHandle.createWritable();
       await wf.write(blob);
       await wf.close();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center w-full pt-16">
      <h1 className="font-bold text-5xl">Bunker Installer</h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex flex-col items-center bg-card p-5 rounded-md">
          <Button variant="secondary" onClick={installLatestVersion}>Install Latest Version</Button>
          {/* <h1 className="f text-xl">Select Version</h1>
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <span>Version</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
              <DropdownMenuItem> real </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
      </div>
    </div>
  );
}
