import Home from './pages/Home.tsx'
import Navbar from './components/Navbar.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles.css'
import Plugins from './pages/Plugins.tsx'
import { useEffect } from 'react'
import { registerDefaultPlugins } from './lib/pluginloader.ts'
import PluginRouter from './pages/PluginRouter.tsx'
import { createRoot } from 'react-dom/client'

window.document.documentElement.classList.add('dark')

if (!window.frameElement) {
  const tab = window.open('about:blank', '_blank')
  
    const iframe = tab!.document.createElement('iframe')
    const stl = iframe!.style
    stl.border = stl.outline = 'none'
    stl.width = '100vw'
    stl.height = '100vh'
    stl.position = 'fixed'
    stl.left = stl.right = stl.top = stl.bottom = '0'
    iframe!.src = self.location.href
    tab!.document.body.appendChild(iframe!)

    tab!.document.title = 'Home'
    const favicon = tab!.document.createElement("link")
    favicon.href = "https://ssl.gstatic.com/classroom/ic_product_classroom_32.png"
    favicon.rel = "shortcut icon"
    tab!.document.head.appendChild(favicon)
    window.location.replace('https://classroom.google.com')
  
}

export default function App() {
  useEffect(() => {
    registerDefaultPlugins()
  }, [])

  return (
    <div className="flex bg-zinc-900">
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" />
        <div className="w-[calc(100vw-4rem)] absolute right-0 top-0 h-screen">
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Plugins />} path="/plugins" />
            <Route element={<PluginRouter />} path="/plugin/:plugin" />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
