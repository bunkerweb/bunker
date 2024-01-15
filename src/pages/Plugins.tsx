import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Plugin, togglePluginDisable } from '@/lib/pluginloader'
import { Dispatch, SetStateAction, useState } from 'react'

export default function Plugins({ loadedPlugins, setLoadedPlugins }: { loadedPlugins: Plugin[]; setLoadedPlugins: Dispatch<SetStateAction<Plugin[]>> }) {
  const [pluginUrl, setPluginUrl] = useState('')
  function uploadPlugin() {
    console.log("uploading ", pluginUrl)
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
            <DialogDescription>Enter a valid plugin url down below. Make sure you trust the plugin's source, as they could be malicious.</DialogDescription>
          </DialogHeader>
          <Input value={pluginUrl} onInput={(e) => setPluginUrl((e.target as HTMLInputElement).value)} placeholder="Plugin URL" />
          <DialogFooter>
            <Button type="submit" onClick={uploadPlugin}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap justify-center gap-4">
        {loadedPlugins.map((plugin, index) => {
          function handleDisable() {
            const disabled = togglePluginDisable(plugin.id)
            setLoadedPlugins((prev) => prev.map((el) => (el.id == plugin.id ? { ...el, disabled: disabled } : el)))
          }

          return (
            <Card key={index} className={`w-80 -z-[${index}]`}>
              <CardHeader>
                <CardTitle>
                  {plugin.name}
                  <br />
                  <span className="font-mono font-normal text-sm">{plugin.id}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>{plugin.description || 'A Bunker plugin.'}</CardContent>
              <CardFooter className="flex justify-between">
                <Switch checked={!plugin.disabled} onCheckedChange={handleDisable} />

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
                        <Button>Confirm</Button>
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
