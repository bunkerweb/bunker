import { Plugin } from '@/lib/pluginloader'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PluginRouter({ loadedPlugins }: { loadedPlugins: Plugin[] }) {
  const [selectedPlugin, setSelectedPlugin] = useState<ReactElement>(<p>Loading...</p>)
  const { plugin } = useParams()

  useEffect(() => {
    const foundPlugin = loadedPlugins.find((selected) => selected.id == plugin)
    if (!foundPlugin) return
    if (!foundPlugin.page) return

    setSelectedPlugin(foundPlugin.page)
  }, [loadedPlugins])
  return <div className="h-screen w-[calc(100vw-4rem)]">{selectedPlugin}</div>
}
