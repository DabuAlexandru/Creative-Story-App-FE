import { toast } from "@/components/ui/use-toast"
import { addReadLater, removeReadLater } from "@/requests/user.profile.requests"

export const toggleReadLater = async ({
  storyId,
  isBookmarked,
}: {
  storyId: number | string,
  isBookmarked: boolean,
}): Promise<boolean> => {
  let request = null
  if (isBookmarked) {
    request = removeReadLater(storyId)
  } else {
    request = addReadLater(storyId)
  }
  const result = await request
  if (result.error) {
    toast({ variant: 'destructive', title: "Couldn't make the operation!", description: result.message })
    return false
  }

  return true
}