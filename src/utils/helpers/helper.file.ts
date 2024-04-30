import { toast } from "@/components/ui/use-toast";
import { retrieveFile } from "@/requests/file.requests";

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