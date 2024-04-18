import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { UserProfileType } from '@/utils/types/user.types'
import { useEffect, useState } from 'react'
import { getAndSetUserProfile } from './utils'
import { useToast } from '@/components/ui/use-toast'
import { AvatarIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const DisplayProfileCard = ({
  userProfile,
  profilePicture
}: {
  userProfile: UserProfileType
  profilePicture: string
}) => {
  const navigate = useNavigate()

  return <Card>
    <CardHeader>User Profile</CardHeader>
    <CardContent>
      <div className='w-36 h-36 rounded-full overflow-hidden border-4 border-white'>
        {Boolean(profilePicture)
          ? <img className='w-full h-full object-cover' src={profilePicture} alt="profile-picture" />
          : <AvatarIcon className='w-full h-full' />
        }
      </div>
      <div className='flex flex-col'>
        <span>Full name: {userProfile.fullName}</span>
        <span>Location: {userProfile.location}</span>
        <span>Bio: {userProfile.bio}</span>
        <span>Website: {userProfile.website}</span>
        <Button variant={'ghost'} onClick={() => navigate("/edit-profile")}>Edit Profile</Button>
      </div>
    </CardContent>
  </Card>
}

const ViewProfile = () => {
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
      : <DisplayProfileCard userProfile={userProfile} profilePicture={imageSrc} />
  )
}

export default ViewProfile