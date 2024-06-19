import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ReviewType, StoryScoreType } from "@/utils/types/story.types"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { useMemo, useState } from "react"
import { starIndexes, starScoreBaseline } from "../DialogDisplayStory/utils"

export const ScoreDisplay = ({ score, isOverallScore = false, label = '' }: { score: number, isOverallScore?: boolean, label?: string }) => {
  const displayScore = isOverallScore ? score.toFixed(2) : score
  return (
    <div className='flex gap-1 items-center p-1'>
      <div className='flex gap-1 items-center border-solid border-2 border-gray-500 px-2 my-[1px] mx-2 rounded-full h-[21px]'>
        {starIndexes.map((index: number) => {
          const isFullStar = index < score - starScoreBaseline
          const starKey = `star-${index}-${isFullStar ? 'FULL' : 'EMPTY'}`
          return isFullStar
            ? <StarFilledIcon key={starKey} />
            : <StarIcon key={starKey} />
        })}
        <span className="font-bold ml-2">{displayScore}</span>
      </div>
      {label ? <span>{label}</span> : null}
    </div>
  )
}

export const ScoreWrapper = ({ scoreDetails, isOverallScore = false }: { scoreDetails: StoryScoreType | ReviewType, isOverallScore?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { characterScore, conflictScore, plotScore, settingScore, themeScore } = scoreDetails

  const overallScore = useMemo(() => {
    const scores = [characterScore, conflictScore, plotScore, settingScore, themeScore]
    return scores.reduce((sum, score) => sum + score, 0) / scores.length
  }, [scoreDetails])

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="space-y-2"
    >
      <div className='flex gap-1 items-center'>
        {starIndexes.map((index: number) => {
          const isFullStar = index < overallScore - starScoreBaseline
          const starKey = `star-${index}-${isFullStar ? 'FULL' : 'EMPTY'}`
          return isFullStar
            ? <StarFilledIcon key={starKey} />
            : <StarIcon key={starKey} />
        })}
        <span className="font-bold ml-2">{overallScore.toFixed(2)}</span>
        <CollapsibleTrigger asChild>
          <Button className="ml-1 py-0 px-2 h-[100%] rounded-full">details</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="mt-0 mb-2">
          <ScoreDisplay score={characterScore} isOverallScore={isOverallScore} label="Character" />
          <ScoreDisplay score={conflictScore} isOverallScore={isOverallScore} label="Conflict" />
          <ScoreDisplay score={plotScore} isOverallScore={isOverallScore} label="Plot" />
          <ScoreDisplay score={settingScore} isOverallScore={isOverallScore} label="Setting" />
          <ScoreDisplay score={themeScore} isOverallScore={isOverallScore} label="Theme" />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}