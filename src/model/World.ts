export type World = {
  id: string
  name: string
  motd: string
  active: boolean
  version: string
  players: Record<string, boolean>
}
