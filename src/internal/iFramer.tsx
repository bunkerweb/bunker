import { Plugin } from '@/lib/pluginloader'
import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const iFramer: Plugin = {
  name: 'iFramer',
  id: 'bunker.iframer',
  description: "Opens an inputted url in an about:blank tab",

  tile() {
    return (
      <div className="w-64 space-y-2">
        <Input placeholder="URL" />
        <Button className="w-full" variant="outline">
          Go
        </Button>
      </div>
    )
  }
}

export default iFramer
