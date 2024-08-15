import { Plugin } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const Status: Plugin = {
  name: "Status",
  id: "bunker.status",
  description: "Display some important internal information about Bunker",

  tile() {
    const [changelogOpen, setChangelogOpen] = useState(false);
    const [secureEnv] = useState(window.top !== window.self);

    useEffect(() => {
      const changelog = setTimeout(() => {
        // setChangelogOpen(true)
      }, 3000);

      return () => {
        clearTimeout(changelog);
      };
    }, []);
    return (
      <div className="w-72">
        <p>
          Hidden from extensions:{" "}
          {secureEnv ? (
            <span className="text-green-500 font-semibold">Active</span>
          ) : (
            <span className="text-red-500 font-semibold">Not Active</span>
          )}
        </p>
        <p>
          Bare server:{" "}
          <span className="text-red-500 font-semibold">Not Connected</span>
        </p>
        <p>
          Version:{" "}
          <span className="text-orange-500 font-semibold">0.1 (dev)</span>
        </p>

        <Dialog open={changelogOpen} onOpenChange={setChangelogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Changelog</DialogTitle>
              <DialogDescription>
                Bunker got a brand new update. You're going to love it.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  },

  onReady() {
    console.log("Status");
  },
};

export default Status;
