import { toast } from "@/components/ui/use-toast";
import { retrieveFile } from "@/requests/file.requests";
import { StateSetter } from "../types/general.types";
import { PictureDictType } from "../types/user.types";
import { toNumber } from "./helper.string";

export const getPictureURL = async (filename: string): Promise<string> => {
  const pictureResponse = await retrieveFile(filename);
  if (pictureResponse.error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: pictureResponse.message
    })
    return '';
  }
  const imageURL = URL.createObjectURL(new Blob([pictureResponse.data]));
  return imageURL
}

export const getAndSetPicture = async (filename: string, setPicture: StateSetter<string>) => {
  if (!filename) {
    return;
  }
  const imageURL = await getPictureURL(filename)
  setPicture(imageURL)
}

export const getAndSetPictureURL = async ({
  picturesDict,
  category,
  pictureKey,
  fileName,
  setPictureUrl
}: {
  picturesDict: PictureDictType
  category: 'profile' | 'cover'
  pictureKey: string | number
  fileName: string
  setPictureUrl: StateSetter<string>
}) => {
  if (!picturesDict) {
    return;
  }
  const idKey = `${category}-${toNumber(pictureKey)}`
  const futurePictureUrl = picturesDict[idKey]
  if (futurePictureUrl) {
    setPictureUrl(futurePictureUrl)
  } else {
    getAndSetPicture(fileName, setPictureUrl)
  }
}