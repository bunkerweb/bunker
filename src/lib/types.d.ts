import { SDK } from "./sdk"

export interface Plugin {
  name: string
  id: string
  disabled?: boolean
  description?: string
  icon?: LucideIcon
  source?: string

  navPosition?: "top" | "bottom"
  tile?: (sdk: SDK) => React.ReactNode
  page?: (sdk: SDK) => React.ReactNode

  onReady?: (sdk: SDK) => void
}

export interface StoreItem {
  name: string
  id: string
  description: string
  url: string
  version: string
  author: string
}
