import { ChangeEvent, useEffect, useState } from 'react'
import { toast, useToast } from '@/components/ui/use-toast';
import { UserProfileType } from '@/utils/types/user.types';
import { getAndSetUserProfile } from '../viewProfile/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formFieldStyle } from '../register/utils';
import { editProfileFormSchema } from './utils';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { updatePicture, updateUserProfile } from '@/requests/user.profile.requests';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';

const ProfileForm = ({
  userProfile
}: {
  userProfile: UserProfileType
}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: userProfile,
  })

  const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {
    setIsLoading(true)
    const response = await updateUserProfile(values);
    setIsLoading(false)
    if (response.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: response.message
      })
      return
    }
    navigate("/view-profile")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="text" placeholder="Enter the Full Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="text" placeholder="Enter the Location..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea disabled={isLoading} placeholder="Enter the Bio..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem style={formFieldStyle}>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="text" placeholder="Enter the Website..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col justify-center items-center'>
          <Button disabled={isLoading} type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

const ProfilePictureForm = ({
  profilePicture
}: {
  profilePicture: string
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(profilePicture)

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
    if(!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile)

    const fileResponse = await updatePicture(formData)
    console.log(fileResponse)
    setSelectedFile(null)
    clearFileInput()
  }

  return (
    <div className='flex flex-col items-center gap-8'>
      <div className='w-[230px] h-[230px] rounded-full overflow-hidden border-4 border-white'>
        {Boolean(profilePicture)
          ? <img className='w-full h-full object-cover' src={previewUrl} alt="profile-picture" />
          : <AvatarIcon className='w-full h-full' />
        }
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Load Another Profile Picture</Label>
        <Input id="picture" type="file" accept='image/*' onChange={handleFileChange} />
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Button type="submit" disabled={!Boolean(selectedFile)} onClick={handleSaveNewFile}>Save</Button>
      </div>
    </div>
  )
}

const EditProfileCard = ({
  userProfile,
  profilePicture
}: {
  userProfile: UserProfileType
  profilePicture: string
}) => {
  return <Card>
    <CardHeader>Edit Your Profile</CardHeader>
    <CardContent>
      <div className='flex flex-row gap-8'>
        <div className='w-2/5'>
          <ProfilePictureForm profilePicture={profilePicture} />
        </div>
        <div className='w-3/5'>
          <ProfileForm userProfile={userProfile} />
        </div>
      </div>
    </CardContent>
  </Card>
}

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null)
  const [imageSrc, setImageSrc] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    getAndSetUserProfile({ userId: null, setIsLoading, setUserProfile, setImageSrc, toast })
  }, [])

  if (isLoading) {
    return <div>Is Loading....</div>
  }

  return (
    (!userProfile)
      ? <div>THERE WAS A PROBLEM!</div>
      : <EditProfileCard userProfile={userProfile} profilePicture={imageSrc} />
  )
}

export default EditProfile