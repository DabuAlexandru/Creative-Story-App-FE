import { retrieveFile } from "@/requests/file.requests";
import { getUserProfile } from "@/requests/user.profile.requests";
import { StateSetter } from "@/utils/types/general.types";
import { UserProfileType } from "@/utils/types/user.types";

export const getAndSetUserProfile = async ({
  userId,
  setIsLoading,
  setUserProfile,
  setImageSrc,
  toast
}: {
  userId: number | null | undefined
  setIsLoading: StateSetter<boolean>
  setUserProfile: StateSetter<UserProfileType | null>
  setImageSrc: StateSetter<string>
  toast: Function
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
  if (profilePictureFilename) {
    const profilePictureResponse = await retrieveFile(profilePictureFilename);
    if (profilePictureResponse.error) {
      setIsLoading(false)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: profilePictureResponse.message
      })
      return;
    }
    const imageUrl = URL.createObjectURL(new Blob([profilePictureResponse.data]));
    setImageSrc(imageUrl)
  }

  setIsLoading(false)
  setUserProfile(userProfile)
}

