import { $plugins } from '@/lib/pluginloader'
import { useStore } from '@nanostores/react'
import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PluginRouter() {
  const loadedPlugins = useStore($plugins)
  const [selectedPlugin, setSelectedPlugin] = useState<ReactElement>()
  const { plugin } = useParams()

  useEffect(() => {
    const foundPlugin = loadedPlugins.find((selected) => selected.id == plugin)
    if (!foundPlugin) return
    if (!foundPlugin.page) return

    setSelectedPlugin(foundPlugin.page)
  }, [loadedPlugins])
  return <div className="h-screen w-[calc(100vw-4rem)] overflow-auto">{selectedPlugin}</div>
}
