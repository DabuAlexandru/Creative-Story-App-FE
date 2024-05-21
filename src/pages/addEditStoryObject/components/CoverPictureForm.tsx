import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { updateStoryCoverRequest } from "@/requests/story.requests";
import { useState, ChangeEvent } from "react";

const CoverPictureForm = ({
  coverPicture,
  storyId
}: {
  coverPicture: string
  storyId: number | string
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(coverPicture)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) {
      return;
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const newPreviewUrl = reader.result as string;
      setPreviewUrl(newPreviewUrl);
    };
    reader.readAsDataURL(file);
  };

  const clearFileInput = () => {
    const fileInput = document.getElementById("picture") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Reset the value of the file input
    }
  };

  const handleSaveNewFile = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile)

    const fileResponse = await updateStoryCoverRequest(storyId, formData)
    if (fileResponse.error) {
      toast({ variant: 'destructive', title: 'File upload failed!', description: fileResponse.message })
      return
    }

    setSelectedFile(null)
    clearFileInput()
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className={`w-[325px] h-[455px] rounded-sm overflow-hidden border-4 border-white`}>
        <Avatar className='w-full h-full rounded-none'>
          <AvatarImage className='object-cover' src={previewUrl} alt="cover-picture" />
          <AvatarFallback className='rounded-none'>Cover Goes Here</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
        <Label htmlFor="picture">Load Another Cover Picture</Label>
        <Input id="picture" type="file" accept='image/*' className="bg-slate-500" onChange={handleFileChange} />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Button disabled={!Boolean(selectedFile)} onClick={(e) => { e.preventDefault(); handleSaveNewFile() }}>Save</Button>
      </div>
    </div>
  )
}

export default CoverPictureForm;
