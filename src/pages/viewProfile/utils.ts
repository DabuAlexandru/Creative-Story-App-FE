import { toast } from "@/components/ui/use-toast";
import { getUserProfile } from "@/requests/user.profile.requests";
import { getAndSetPicture } from "@/utils/helpers/helper.file";
import { StateSetter } from "@/utils/types/general.types";
import { UserProfileType } from "@/utils/types/user.types";

export const getAndSetUserProfile = async ({
  setIsLoading,
  setUserProfile,
  setImageSrc
}: {
  setIsLoading: StateSetter<boolean>
  setUserProfile: StateSetter<UserProfileType | null>
  setImageSrc: StateSetter<string>
}) => {
  setIsLoading(true)
  const userProfileResponse = await getUserProfile();
  if (userProfileResponse.error) {
    setIsLoading(false)
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: userProfileResponse.message
    })
    return;
  }

  const userProfile: UserProfileType = userProfileResponse.data
  const profilePictureFilename = userProfile.profilePicture?.fileName || ''
  await getAndSetPicture(profilePictureFilename, setImageSrc)

  setIsLoading(false)
  setUserProfile(userProfile)
}

