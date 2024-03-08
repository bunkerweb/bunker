import { Plugin } from '@/lib/pluginloader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { Globe } from 'lucide-react'

const Viewer: Plugin = {
  name: 'Viewer',
  id: 'bunker.viewer',
  description: 'Privately view a website inside Bunker',
  icon: Globe,

  tile() {
    const [url, setUrl] = useState('')
    return (
      <div className="w-64 space-y-1.5">
        <Input placeholder="URL (not proxied)" value={url} onInput={(e) => setUrl((e.target as HTMLInputElement).value)} />
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            try {
              new URL(url)
              const tab = window.open('about:blank', '_blank')
              if (!tab) return
              const iframe = tab.document.createElement('iframe')

              const stl = iframe.style
              stl.border = stl.outline = 'none'
              stl.width = '100vw'
              stl.height = '100vh'
              stl.position = 'fixed'
              stl.left = stl.right = stl.top = stl.bottom = '0'

              iframe.src = url
              tab.document.body.appendChild(iframe)

              setUrl('')
            } catch (e) {
              toast.error('Invalid URL. Please make sure to include https://')
            }
          }}
        >
          Go
        </Button>
      </div>
    )
  },
  page() {
    const [url] = useState('')

    return (
      <div className="h-full w-full">
        {url ? (
          <div></div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 text-center">
            <h1 className="text-4xl font-bold">Viewer</h1>
            <p>Privately use your game sites or proxies</p>

            <div className="flex items-center gap-2 w-96">
              <Input></Input> <Button>Go</Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Viewer
