import { toast } from "@/components/ui/use-toast";
import { retrieveFile } from "@/requests/file.requests";
import { StateSetter } from "../types/general.types";
import { PictureDictType } from "../types/user.types";
import { toNumber } from "./helper.string";

export const getProfilePictureURL = async (filename: string): Promise<string> => {
  const profilePictureResponse = await retrieveFile(filename);
  if (profilePictureResponse.error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: profilePictureResponse.message
    })
    return '';
  }
  const imageURL = URL.createObjectURL(new Blob([profilePictureResponse.data]));
  return imageURL
}

export const getAndSetProfilePicture = async (filename: string, setProfilePicture: StateSetter<string>) => {
  if (!filename) {
    return;
  }
  const imageURL = await getProfilePictureURL(filename)
  setProfilePicture(imageURL)
}

export const getAndSetProfilePictureURL = async ({
  picturesDict,
  profileId,
  fileName,
  setProfilePictureUrl
}: {
  picturesDict: PictureDictType
  profileId: string | number
  fileName: string
  setProfilePictureUrl: StateSetter<string>
}) => {
  if (!picturesDict) {
    return;
  }
  const pictureKey = toNumber(profileId)
  const futureProfilePictureUrl = picturesDict[pictureKey]
  if (futureProfilePictureUrl) {
    setProfilePictureUrl(futureProfilePictureUrl)
  } else {
    getAndSetProfilePicture(fileName, setProfilePictureUrl)
  }
}