import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Plugin, togglePluginDisable } from '@/lib/pluginloader'
import { Dispatch, SetStateAction } from 'react'

export default function Plugins({ loadedPlugins, setLoadedPlugins }: { loadedPlugins: Plugin[]; setLoadedPlugins: Dispatch<SetStateAction<Plugin[]>> }) {
  return (
    <div className="flex flex-col items-center w-full pt-16">
      <h1 className="font-bold text-5xl">Plugins</h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {loadedPlugins.map((plugin, index) => {
          function handleDisable() {
            const disabled = togglePluginDisable(plugin.id)
            setLoadedPlugins((prev) => prev.map((el) => (el.id == plugin.id ? { ...el, disabled: disabled } : el)))
          }

          return (
            <Card key={index} className="w-80">
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
