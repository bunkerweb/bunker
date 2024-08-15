import { Button } from "@/components/ui/button";
import { Plugin } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Updater: Plugin = {
  name: "Updater",
  id: "bunker.updater",
  tile() {
    const currentVersion = "v0.1.6";
    const [latestVersion, setLatestVersion] = useState<string>();
    const [installedVersion, setInstalledVersion] = useState<string>();

    useEffect(() => {
      setInstalledVersion("v0.1.6");
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
        <p>latest version: {latestVersion}</p>
        <p>current version: {currentVersion}</p>
        <Button onClick={() => localStorage.clear()}>reset</Button>
      </>
    );
  },
  // tile() {
  //   const [latestTag, setLatestTag] = useState<string>(
  //     localStorage.getItem("latestTag") || "lol no localstorage thing"
  //   );

  //   async function updateBunker() {
  //     console.log(latestTag);
  //     console.log(localStorage.getItem("latestTag"));
  //     toast("New Bunker update available [" + latestTag + "]", {
  //       action: {
  //         label: "Install Now",
  //         onClick: () => console.log("Undo"),
  //       },
  //     });
  //   }

  //   useEffect(() => {
  //     const fetchLatestTag = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://api.github.com/repos/bunkerweb/bunker/tags"
  //         );
  //         const data = await response.json();
  //         if (data.length > 0) {
  //           const tagName = data[0].name;

  //           const storedTag = localStorage.getItem("latestTag");
  //           if (storedTag === tagName) {
  //             return;
  //           }

  //           localStorage.setItem("latestTag", tagName);
  //           setLatestTag(tagName);

  //           await updateBunker();
  //         }
  //       } catch (error) {
  //         console.error("Error fetching the latest tag:", error);
  //       }
  //     };

  //     fetchLatestTag();
  //   }, []);

  //   return (
  //     <>
  //       <p>Latest version: {latestTag}</p>
  //       <Button
  //         onClick={() => {
  //           localStorage.clear();
  //         }}
  //       >
  //         reset
  //       </Button>
  //     </>
  //   );
  // },
};

export default Updater;
