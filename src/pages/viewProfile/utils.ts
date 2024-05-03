import { toast } from "@/components/ui/use-toast";
import { getUserProfile } from "@/requests/user.profile.requests";
import { getAndSetProfilePicture } from "@/utils/helpers/helper.file";
import { StateSetter } from "@/utils/types/general.types";
import { UserProfileType } from "@/utils/types/user.types";

export const getAndSetUserProfile = async ({
  userId,
  setIsLoading,
  setUserProfile,
  setImageSrc
}: {
  userId: number | null | undefined
  setIsLoading: StateSetter<boolean>
  setUserProfile: StateSetter<UserProfileType | null>
  setImageSrc: StateSetter<string>
}) => {
  if (!userId) {
  }
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
  const profilePictureFilename = userProfile.profilePicture?.fileName;

  getAndSetProfilePicture(profilePictureFilename, setImageSrc)

  setIsLoading(false)
  setUserProfile(userProfile)
}

