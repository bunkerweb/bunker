import { Plugin } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as semver from "semver";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Updater: Plugin = {
  name: "Updater",
  id: "bunker.updater",
  description: "Bunker's internal updater. Provides automatic updates, as well as historical updates.",
  icon: RefreshCw,
  tile() {
    const currentVersion = "v0.1.7";
    const [latestVersion, setLatestVersion] = useState<string>();
    const [installedVersion, setInstalledVersion] = useState<string>();

    useEffect(() => {
      setInstalledVersion("v0.1.7");
      async function getLatestVersion() {
        const response = await fetch(
          "https://api.github.com/repos/bunkerweb/bunker/tags"
        );
        const data = await response.json();
        if (data.length > 0) {
          const tagName = data[0].name;
          setLatestVersion(tagName);
          console.log("real");
          checkIfUpToDate();
        }
      }

      getLatestVersion();

      async function checkIfUpToDate() {
        if (latestVersion == undefined) return;
        if (latestVersion == installedVersion) {
          toast("Your Bunker is up to date!", {
            action: {
              label: "Dismiss",
              onClick: () => console.log("Dismissed."),
            },
          });
        } else if (latestVersion !== undefined) {
          toast("New Bunker update available [" + latestVersion + "]", {
            action: {
              label: "Install Now",
              onClick: () => updateBunker(),
            },
          });
        }
      }

      async function updateBunker() {
        toast("Starting update process...", {
          action: {
            label: "Cancel",
            onClick: () => console.log("Update cancelled"),
          },
        });

        try {
          const response = await fetch(
            "https://raw.githubusercontent.com/bunkerweb/bunker/updates/index.html"
          );
          const blob = await response.blob();
          toast("Processing update package...");

          // @ts-ignore
          const fileHandle = await window.showOpenFilePicker({
            types: [
              {
                description: "Please Select Bunker",
                accept: {
                  "text/html": [".html"],
                },
              },
            ],
          });
          const nfc = await blob.text();
          const wf = await fileHandle[0].createWritable();
          await wf.write(nfc);
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
    });

    return (
      <>
        <p>Latest Bunker version: {latestVersion}</p>
        <p>Installed Bunker version: {currentVersion}</p>
      </>
    );
  },

  page() {
    const [archivedVersions, setArchivedVersions] = useState<any[]>([]);
    const [installedVersion, setInstalledVersion] = useState<string>();
    const [selectedVersion, setSelectedVersion] = useState("Select Version");
    const [updateText, setUpdateText] = useState<string>();

    useEffect(() => {
      compareVersions(installedVersion, selectedVersion);
    },[selectedVersion]) 

    useEffect(() => {
      setInstalledVersion("v0.1.8");
    });

    useState(() => {
      setArchiveVersion();
    });

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
    }

    async function compareVersions(installedVersion: string | undefined, status: string) {
      semver.clean(status);
      if (installedVersion) { 
        if (semver.diff(installedVersion, status) == "major") {
          setUpdateText("Update Bunker");
        } else if (semver.diff(installedVersion, status) == "minor") {
          setUpdateText("Downgrade Bunker");
        } else {
          setUpdateText("No Update Available");
        }
      } else {
        setUpdateText("Unknown");
      }
    };
    return (
      <>
        <div className="mx-auto mt-20 max-w-md p-5 bg-card rounded-lg">
          <h1 className="text-xl font-bold">Bunker Updater</h1>
          <p className="mt-1">
            Bunker's internal updater. Provides automatic updates, as well as
            historical updates.
          </p>

          <hr className="my-5"></hr>

          <h1 className="text-xl font-bold text-center">Archived Versions</h1>
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
            onClick={() => window.location.reload()}
          >
            {updateText}
          </Button>
        </div>
        </div>
      </>
    )
  },
};

export default Updater;
