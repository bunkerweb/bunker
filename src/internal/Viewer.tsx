import { Plugin } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Globe } from "lucide-react";

const Viewer: Plugin = {
  name: "Viewer",
  id: "bunker.viewer",
  description: "Privately view a website inside Bunker",
  icon: Globe,

  tile() {
    const [url, setUrl] = useState("");
    return (
      <div className="w-64 space-y-1.5">
        <Input
          placeholder="URL (not proxied)"
          value={url}
          onInput={(e) => setUrl((e.target as HTMLInputElement).value)}
        />
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            try {
              new URL(url);
              const tab = window.open("about:blank", "_blank");
              if (!tab) return;
              const iframe = tab.document.createElement("iframe");

              const stl = iframe.style;
              stl.border = stl.outline = "none";
              stl.width = "100vw";
              stl.height = "100vh";
              stl.position = "fixed";
              stl.left = stl.right = stl.top = stl.bottom = "0";

              iframe.src = url;
              tab.document.body.appendChild(iframe);

              setUrl("");
            } catch (e) {
              toast.error("Invalid URL. Please make sure to include https://");
            }
          }}
        >
          Go
        </Button>
      </div>
    );
  },
  page() {
    const [url, setUrl] = useState("");
    const [iframeVisable, setIframeVisable] = useState(false);
    const launchViewer = (url: string) => {
      try {
        new URL(url);
        const iframe = document.getElementById("iframe") as HTMLIFrameElement;
        iframe.src = url;
        setIframeVisable(true);
      } catch (e) {
        toast.error("Invalid URL. Please make sure to include https://");
      }
    };

    return (
      <div className="h-full w-full">
        {!iframeVisable && (
          <div className="flex flex-col items-center justify-center rounded-lg px-6 mt-20 py-10">
            <div className="flex flex-col">
              <h1 className="font-bold text-5xl text-center mb-2">
                Bunker Viewer
              </h1>
              <Input
                className="border-none w-full mb-1"
                placeholder="URL (not proxied)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
              />
              <Button
                className="hover:bg-primary hover:text-black"
                variant="outline"
                onClick={() => launchViewer(url)}
              >
                Go!
              </Button>
            </div>
          </div>
        )}
        <div className="w-full h-[92%] px-2 mt-2">
          <iframe id="iframe" className="w-full h-full" />
        </div>

        {iframeVisable && (
          <div className="flex justify-center mt-2">
            <Input
              className="border-none w-1/2 mb-1 mx-1"
              placeholder="URL (not proxied)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
            />
            <Button
              className="hover:bg-primary hover:text-black mx-1"
              variant="outline"
              onClick={() => launchViewer(url)}
            >
              Go!
            </Button>
          </div>
        )}
      </div>
    );
  },
};

export default Viewer;
