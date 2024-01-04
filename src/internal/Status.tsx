import { Plugin } from '@/lib/pluginloader'

const Status: Plugin = {
  name: 'Status',
  id: 'bunker.status',
  description: 'Display some important internal information about Bunker',

  tile() {
    return (
      <div>
        <p>Hidden from extensions: <span className="text-green-500 font-semibold">Active</span> </p>
        <p>Bare server: <span className="text-red-500 font-semibold">Not Connected</span></p>
        <p>Version: <span className="text-orange-500 font-semibold">0.1 (dev)</span></p>
      </div>
    )
  },

  page() {
    return <p>hi</p>
  }
}

export default Status
