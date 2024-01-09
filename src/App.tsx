import Home from './pages/Home.tsx'
import Navbar from './components/Navbar.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Plugins from './pages/Plugins.tsx'
import { useEffect, useState } from 'react'
import { Plugin, pluginEventEmitter, plugins, registerDefaultPlugins } from './lib/pluginloader.ts'
import PluginRouter from './pages/PluginRouter.tsx'

window.document.documentElement.classList.add('dark')

export default function App() {
  const [loadedPlugins, setLoadedPlugins] = useState<Plugin[]>([])
  function handleNewPlugins() {
    setLoadedPlugins(plugins)
  }

  useEffect(() => {
    registerDefaultPlugins()
    handleNewPlugins()
    pluginEventEmitter.on('pluginUpdate', handleNewPlugins)

    return () => {
      pluginEventEmitter.off('pluginUpdate', handleNewPlugins)
    }
  }, [])

  return (
    <div className="flex bg-zinc-900">
      <BrowserRouter>
        <Navbar loadedPlugins={loadedPlugins} />
        <Toaster position="top-right" />
        <div className="w-[calc(100vw-4rem)] absolute right-0 top-0 h-screen">
          <Routes>
            <Route element={<Home loadedPlugins={loadedPlugins} />} path="/" />
            <Route element={<Plugins loadedPlugins={loadedPlugins} setLoadedPlugins={setLoadedPlugins} />} path="/plugins" />
            <Route element={<PluginRouter loadedPlugins={loadedPlugins} />} path="/plugin/:plugin" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}
