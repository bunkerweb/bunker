import { Plugin } from '@/lib/pluginloader'
import { Star } from 'lucide-react'

const Bookmarklets: Plugin = {
  name: 'Bookmarklets',
  id: 'bunker.bookmarklets',
  description: 'Store your bookmarklets in a convienent location',
  icon: Star,


  page() {
    return <p>hi</p>
  }
}

export default Bookmarklets
