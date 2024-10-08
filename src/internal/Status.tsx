import { Plugin } from "@/lib/types"
import bunker from "@/lib/bunker"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

const Status: Plugin = {
  name: "Status",
  id: "bunker.status",
  description: "Display some important internal information about Bunker",

  tile() {
    const [changelogOpen, setChangelogOpen] = useState(false)
    const [secureEnv] = useState(window.top !== window.self)

    useEffect(() => {
      const changelog = setTimeout(() => {
        // setChangelogOpen(true)
      }, 3000)

      return () => {
        clearTimeout(changelog)
      }
    }, [])
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
          <span className="text-orange-500 font-semibold">
            {bunker.version} (dev)
          </span>
        </p>
        <p>
          <button
            onClick={() => setChangelogOpen(true)}
            className="text-green-500 underline font-semibold"
          >
            Changelog
          </button>
        </p>

        <Dialog open={changelogOpen} onOpenChange={setChangelogOpen}>
          <DialogContent>
            <DialogHeader>
            <DialogTitle>v0.2.5</DialogTitle>
              <DialogDescription>
                What's new?
                <br />- Auto Update Toggle
                <br />- 2 Notification Settings
                <br />- Tab Cloak Settings
                <br />- Added ability to change Tab Settings via SDK.
                <br />- Added notification support to SDK
                <br />
              </DialogDescription>
              {/* <DialogTitle>v0.2.4</DialogTitle>
              <DialogDescription>
                What's new?
                <br />- Added changelog
                <br />- Added settings
                <br />- Added the ability to store plugins internally
                (unblockable)
                <br />- Added fullscreen to GBA + Viewer
                <br />- Added SDK! This is still a WIP, but soon you will see
                many more features which take advantage of it behind the scenes!
                <br />
              </DialogDescription> */}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    )
  },

  onReady() {
    console.log("Status")
  },
}

export default Status
