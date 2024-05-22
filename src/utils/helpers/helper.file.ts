import { toast } from "@/components/ui/use-toast";
import { retrieveFile } from "@/requests/file.requests";
import { StateSetter } from "../types/general.types";

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
    return '';
  }
  const imageURL = await getPictureURL(filename)
  setPicture(imageURL)
  return imageURL
}