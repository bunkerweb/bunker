import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { $plugins, fetchExternalPlugin, registerPlugin } from '@/lib/plugins'
import { StoreItem } from '@/lib/types'
import { useStore } from '@nanostores/react'
import { useEffect, useState } from 'react'
import store from 'store2'
import useSWR from 'swr'

export default function Store() {
  const { data, isLoading } = useSWR('https://raw.githubusercontent.com/bunkerweb/store/main/data.json', (url) => fetch(url).then((r) => r.json()))

  const [installedPlugins, setInstalledPlugins] = useState<string[]>([])
  const plugins = useStore($plugins)

  useEffect(() => {
    if (!data) return
    console.log(data)

    for (const plugin of data.plugins) {
      const foundPlugin = plugins.find((p) => {
        console.log(p.id, plugin.id)
        return p.id === plugin.id
      })
      if (!foundPlugin) return

      if (!installedPlugins.includes(foundPlugin.id)) setInstalledPlugins((prev) => [...prev, foundPlugin.id])
    }
  }, [data, plugins])

  return (
    <div className="flex flex-col items-center w-full pt-16 space-y-8">
      <h1 className="font-bold text-5xl">Store</h1>

      {!isLoading &&
        data!.plugins.map((plugin: StoreItem) => {
          return (
            <Card className="w-80" key={plugin.id}>
              <CardHeader>
                <CardTitle>{plugin.name}</CardTitle>
                <CardDescription>{plugin.id}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>{plugin.description}</div>

                {installedPlugins.includes(plugin.id) ? (
                  <Button disabled>Installed</Button>
                ) : (
                  <Button
                    onClick={async () => {
                      const data = await fetchExternalPlugin(plugin.url)
                      if (!data) return

                      registerPlugin({
                        ...data,
                        source: plugin.url
                      })
                      store('savedPlugins', [...store('savedPlugins'), plugin.url])
                    }}
                  >
                    Install
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
