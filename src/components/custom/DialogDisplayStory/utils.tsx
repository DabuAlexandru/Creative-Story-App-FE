import { toggleReadLater } from "@/utils/helpers/helper.profile"
import { StateSetter } from "@/utils/types/general.types"
import { ReadLaterType } from "@/utils/types/user.types"

export const starIndexes = [0, 1, 2, 3, 4]

export const starScoreBaseline = 0.5

export const updateReadLaterList = async ({
  setIsLoading,
  setReadLater,
  storyId,
  isBookmarked
}: {
  setIsLoading: StateSetter<boolean>
  setReadLater: StateSetter<ReadLaterType[]>
  storyId: string | number
  isBookmarked: boolean
}) => {
  setIsLoading(true)
  const success = await toggleReadLater({ storyId, isBookmarked })
  if (success) {
    if (isBookmarked) {
      setReadLater((oldReadLater: ReadLaterType[]) => {
        const futureReadLater = [...oldReadLater]
        const index = futureReadLater.findIndex((elem) => elem.storyId == storyId);
        if (index > -1) {
          futureReadLater.splice(index, 1);
        }
        return futureReadLater
      })
    } else {
      const newElem: ReadLaterType = { storyId, createdOn: new Date() }
      setReadLater((oldReadLater: ReadLaterType[]) => ([...oldReadLater, newElem]))
    }
  }
}