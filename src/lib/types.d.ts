import { LucideIcon } from "lucide-react"
import { SDK } from "./sdk"

export interface Plugin {
  /** The name of the plugin to be displayed. */
  name: string

  /** A unique plugin identifier. */
  id: string

  /**
    If the plugin should be disabled.
    (Mostly only used internally)
  */
  disabled?: boolean

  /** A description of the plugin to be displayed. */
  description?: string

  /**
   An icon that represents the plugin to be displayed in the sidebar.
   (Only shows in the sidebar if `page()` is used)
   */
  icon?: LucideIcon

  /**
    The URL for the plugin source.
    (Mostly only used internally)
  */
  source?: string

  navPosition?: "top" | "bottom"

  /**
    Render a tile on the homescreen using a React component.
    Returned components will be displayed in the tile under the plugin's name.
  */
  tile?: (props: { sdk: SDK }) => React.ReactNode
  
  /** Render a page to be accessed from the sidebar using a React component. */
  page?: (props: { sdk: SDK }) => React.ReactNode

  /** Event that fires when the plugin is first loaded. */
  onReady?: (props: { sdk: SDK }) => void
}

export interface StoreItem {
  name: string
  id: string
  description: string
  url: string
  version: string
  author: string
}
