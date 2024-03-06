import { Plugin } from '@/lib/pluginloader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'

const iFramer: Plugin = {
  name: 'Viewer',
  id: 'bunker.viewer',
  description: 'Privately view a website inside Bunker',

  tile() {
    const [url, setUrl] = useState('');
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
  }
}

export default iFramer