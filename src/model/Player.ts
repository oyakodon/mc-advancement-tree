import { Progress } from './Progress'

export type PlayerProfile = {
  id: string
  name: string
}

export type Player = PlayerProfile & {
  online: boolean
  progress: Progress
}
