import { Button } from "@/components/ui/button"

export default function Info() {
  const version = "v0.2.2"
  return (
    <>
      <div className="text-center font-bold text-5xl mt-16">About Bunker</div>
      <div className="text-center font-bold text-xl mt-2">
        Version: {version}
      </div>

      <div className="text-center font-semibold text-xl mt-1">
        <Button
          variant="link"
          onClick={() => window.open("https://github.com/bunkerweb/bunker")}
        >
          Github
        </Button>
        <Button
          variant="link"
          onClick={() => window.open("https://bunker-14r.pages.dev/")}
        >
          Website
        </Button>
      </div>

      <div className="mt-5 flex flex-col items-center">
        <h1 className="text-3xl font-bold">Changelog:</h1>
        <div className="mt-5 flex flex-col gap-2">
          <div>
            <h2 className="text-3xl font-bold">v1.0.0</h2>
            <ul className="list-disc ml-5 text-xl">
              <li>Initial Release</li>
              <li>Added support for plugins</li>
            </ul>
            <h2 className="text-3xl font-bold mt-2">v2.0.0</h2>
            <ul className="list-disc ml-5 text-xl">
              <li>Initial Release</li>
              <li>Added support for plugins</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
