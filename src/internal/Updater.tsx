import { Plugin } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Updater: Plugin = {
  name: "updater",
  id: "bunker.updater",
  tile() {
    const [latestTag, setLatestTag] = useState<string>(() => {
      localStorage.getItem("latestTag");
    });

    async function updateBunker() {
        toast('New Bunker update available [' + latestTag + ']', {
            action: {
                label: 'Install Now',
                onClick: () => console.log('Undo')
            },
        });
    }

    useEffect(() => {
      const fetchLatestTag = async () => {
        try {
          const response = await fetch(
            "https://api.github.com/repos/bunkerweb/bunker/tags"
          );
          const data = await response.json();
          if (data.length > 0) {
            const tagName = data[0].name;

            const storedTag = localStorage.getItem("latestTag");
            if (storedTag === tagName) {
              return;
            }

            setLatestTag(tagName);
            localStorage.setItem("latestTag", tagName);

            await updateBunker();
          }
        } catch (error) {
          console.error("Error fetching the latest tag:", error);
        }
      };

      fetchLatestTag();
    }, []);

    return <></>;
  },
};

export default Updater;
