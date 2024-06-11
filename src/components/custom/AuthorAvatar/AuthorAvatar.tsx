import { UserProfileReferenceType } from '@/utils/types/user.types'
import { AvatarIcon } from "@radix-ui/react-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { extractSignatureFromString } from '@/utils/helpers/helper.string'
import { PictureContext } from '@/utils/providers/PicturesProvider'
import { useContext, useState, useMemo, useEffect } from 'react'

const AuthorAvatar = ({
  author,
  className = ''
}: {
  author: UserProfileReferenceType,
  className?: string | undefined
}) => {
  const { getAndSetPictureURL } = useContext(PictureContext)
  const [profilePictureUrl, setProfilePictureUrl] = useState('')

  const signature = useMemo(() => extractSignatureFromString(author?.penName), [author?.penName])

  useEffect(() => {
    if (!profilePictureUrl && getAndSetPictureURL) {
      getAndSetPictureURL({ category: 'profile', fileName: author?.profilePicture?.fileName, setPictureUrl: setProfilePictureUrl })
    }
  }, [])

  if (!author) {
    return <AvatarIcon className={className} />
  }
  return (
    <Avatar className={`text-slate-50 border-2 border-slate-50 ${className || ''}`}>
      <AvatarImage src={profilePictureUrl} alt={author?.profilePicture?.fileName || 'unloaded'} />
      <AvatarFallback>{signature}</AvatarFallback>
    </Avatar>
  )
}

export default AuthorAvatar