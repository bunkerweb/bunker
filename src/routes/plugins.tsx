import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { $plugins, fetchExternalPlugin, registerPlugin, removePlugin, togglePluginDisable } from '@/lib/plugins'
import { useState } from 'react'
import { useStore } from '@nanostores/react'
// import { Badge } from '@/components/ui/badge'
// import { AlertCircle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import store from 'store2'

export default function Plugins() {
  const [pluginUrl, setPluginUrl] = useState('')
  const plugins = useStore($plugins)
  async function uploadPlugin() {
    try {
      new URL(pluginUrl)
      if (!pluginUrl.endsWith('.js')) return toast.error('Invalid plugin URL provided.')
      const plugin = await fetchExternalPlugin(pluginUrl)
      if (!plugin || !plugin.id) return toast.error('Invalid plugin URL provided.')

      registerPlugin(plugin)
      store('savedPlugins', [...(store('savedPlugins') || []), pluginUrl])
    } catch (e) {
      toast.error('Invalid plugin URL provided.')
    }
  }
  return (
    <div className="flex flex-col items-center w-full pt-16 space-y-8">
      <h1 className="font-bold text-5xl">Plugins</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Plugin</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add plugin</DialogTitle>
            <DialogDescription>
              Enter a valid plugin url down below. Make sure you trust the plugin's source, as they could be malicious.
              {/* {pluginUrl.startsWith('https://raw.githubusercontent.com/cafe-labs/bunker-plugins') ? (
                <Badge variant="default" className="mt-2 bg-green-400 hover:bg-green-400">
                  <CheckCircle className="h-4 w-4 mr-1.5" /> Verified
                </Badge>
              ) : pluginUrl ? (
                <Badge variant="default" className="mt-2 bg-red-400 hover:bg-red-400">
                  <AlertCircle className="h-4 w-4 mr-1.5" /> Unverified
                </Badge>
              ) : null} */}
            </DialogDescription>
          </DialogHeader>
          <Input value={pluginUrl} onInput={(e) => setPluginUrl((e.target as HTMLInputElement).value)} placeholder="Plugin URL" />
          <DialogFooter>
            <Button type="submit" onClick={uploadPlugin}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap justify-center gap-4">
        {plugins.map((plugin, index) => {
          function handleDisable() {
            togglePluginDisable(plugin.id)
          }

          return (
            <Card key={index} className={`w-80`}>
              <CardHeader>
                <CardTitle>
                  {plugin.name}
                  <br />
                  <span className="font-mono font-normal text-sm">{plugin.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>{plugin.description || 'A Bunker plugin.'}</CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Switch checked={!plugin.disabled} onCheckedChange={handleDisable} />
                  <Label>Enabled</Label>
                </div>

                {!plugin.id.startsWith('bunker.') && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Remove</Button>
                    </DialogTrigger>
                    <DialogContent className="w-96">
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This will remove "{plugin.name}" and all of its features.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            removePlugin(plugin.id)
                          }}
                        >
                          Confirm
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
