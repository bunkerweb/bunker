import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
  const [archivedVersions, setArchivedVersions] = useState<any[]>([]);
  const [selectedVersion, setSelectedVersion] = useState("Select Version");
  const [updateText, setUpdateText] = useState<string>();
  const [selectedBuild, setSelectedBuild] = useState<string>();

  useState(() => {
    setArchiveVersion();
  });

  useEffect(() => {
    compareVersions();
  }, [selectedVersion]);

  async function setArchiveVersion() {
    const response = await fetch("https://api.github.com/repos/bunkerweb/bunker/commits?sha=updates");
    const data = await response.json();
    let versions = [] as any[];
    data.forEach((version: { commit: { message: string } }) => {
      if (version.commit.message.startsWith("v")) {
        versions.push(version)
      }
    })
    setArchivedVersions(versions);
    console.log(versions);
  }
  

  async function compareVersions() {
    setUpdateText("Install Version");
  };

  async function updateBunker() {
    if (updateText == "None Selected") return;
    // @ts-ignore
    if (selectedBuild.sha === null) return;
    toast("Starting update process...", {
      action: {
        label: "Cancel",
        onClick: () => console.log("Update cancelled"),
      },
    });

    try {
      const response = await fetch(
        // @ts-ignore
        "https://raw.githubusercontent.com/bunkerweb/bunker/" + selectedBuild.sha + "/index.html"
      );

      const blob = await response.blob();
      //@ts-ignore
      let d = await window.showDirectoryPicker();
      const bunkerFolder = await d.getDirectoryHandle("bunker", { create: true });
      const fileHandle = await bunkerFolder.getFileHandle("index.html", { create: true });
      const wf = await fileHandle.createWritable();
      await wf.write(blob);
      await wf.close();
      toast("Update complete! Refresh to apply changes.", {
        action: {
          label: "Refresh",
          onClick: () => window.location.reload(),
        },
      });
    } catch (error) {
      toast("Error updating bunker: ", {
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismissed"),
        },
      });
      console.error(error);
    }
  }
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
      <Button className="mt-8" variant="secondary" onClick={installLatestVersion}>Install Latest Version</Button>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <div className="flex flex-col items-center bg-card p-5 rounded-md">
          <h1 className="text-xl font-bold text-center mt-2">Archived Versions</h1>
          <div className="flex justify-center mt-1">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">{selectedVersion}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               {archivedVersions.map((version) => (
                <DropdownMenuItem
                  key={version.commit.message}
                  onClick={() => {
                    setSelectedVersion(version.commit.message);
                    setSelectedBuild(version);
                  }}
                >
                  {version.commit.message}
                </DropdownMenuItem>
              ))} 
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex justify-center mt-1">
          <Button
            variant="secondary"
            onClick={() => updateBunker()}
          >
            {updateText}
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
