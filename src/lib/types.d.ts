export interface Plugin {
  name: string
  id: string
  disabled?: boolean
  description?: string
  icon?: LucideIcon
  source?: string

  navPosition?: 'top' | 'bottom'
  tile?: () => React.ReactElement
  page?: () => React.ReactElement

  onReady?: () => void
}

export interface StoreItem {
  name: string
  id: string
  description: string
  url: string
}
