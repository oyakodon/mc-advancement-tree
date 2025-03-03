import { Info } from 'lucide-react'
import { ReactNode } from 'react'

import PlayerIcon from '../player/PlayerIcon'

import ProgressBadge from './ProgressBadge'
import ProgressTooltip from './ProgressTooltip'

import {
  Tooltip as CnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PlayerProfile } from '@/model/Player'
import { Progress } from '@/model/Progress'

const Tooltip = ({ tip, children }: { tip: ReactNode; children: ReactNode }) => {
  return (
    <TooltipProvider>
      <CnTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>

        <TooltipContent>{tip}</TooltipContent>
      </CnTooltip>
    </TooltipProvider>
  )
}

const AchievedTooltip = ({ achieved }: { achieved: string }) => {
  const date = new Date(achieved)
  const dateText = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  return <span className='text-xs font-medium'>Last achieved: {dateText}</span>
}

interface Props {
  player: PlayerProfile
  progress: Progress
}

const PlayerProgress = ({ player: p, progress }: Props) => {
  return (
    <div className='flex flex-wrap flex-auto items-center justify-between gap-3 max-h-14'>
      <PlayerIcon player={p} width={48} />

      <div className='flex flex-auto'>
        <span className='font-bold lg:text-md truncate dark:text-white'>{p.name}</span>
      </div>

      <div className='flex items-center gap-4'>
        {progress.achieved && (
          <Tooltip tip={<AchievedTooltip achieved={progress.achieved} />}>
            <Info color='gray' />
          </Tooltip>
        )}

        <Tooltip tip={<ProgressTooltip progress={progress} />}>
          <ProgressBadge progress={progress} />
        </Tooltip>
      </div>
    </div>
  )
}

export default PlayerProgress
