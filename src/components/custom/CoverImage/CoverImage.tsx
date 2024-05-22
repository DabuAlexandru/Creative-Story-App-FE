import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PictureContext } from "@/utils/providers/PicturesProvider"
import { useContext, useState, useEffect, useMemo } from "react"

const IMAGE_SIZE_RATIO = 1.4
const DEFAULT_WIDTH = 100
const DEFAULT_HEIGHT = DEFAULT_WIDTH * IMAGE_SIZE_RATIO

const CoverImage = ({
  fileName,
  initialWidth = DEFAULT_WIDTH,
  initialHeight = DEFAULT_HEIGHT,
  className = ''
}: {
  fileName: string,
  initialWidth?: number,
  initialHeight?: number,
  className?: string
}) => {
  const { getAndSetPictureURL } = useContext(PictureContext)
  const [coverPictureUrl, setCoverPictureUrl] = useState('')

  const { width, height } = useMemo(() => {
    const sizes = { width: initialWidth, height: initialHeight }
    if (initialHeight === DEFAULT_HEIGHT && initialWidth !== DEFAULT_WIDTH) {
      sizes.height = initialWidth * IMAGE_SIZE_RATIO
    } else if (initialHeight !== DEFAULT_HEIGHT && initialWidth === DEFAULT_WIDTH) {
      sizes.width = initialHeight / IMAGE_SIZE_RATIO
    }
    return sizes
  }, [])

  useEffect(() => {
    if (!coverPictureUrl && fileName) {
      getAndSetPictureURL({ category: 'profile', fileName, setPictureUrl: setCoverPictureUrl })
    }
  }, [fileName])

  return (
    <div
      style={{ width: `${width}px`, minWidth: `${width}px`, height: `${height}px`, minHeight: `${height}px` }}
      className={`rounded-sm overflow-hidden border-4 border-white ${className || ''}`}
    >
      <Avatar className='w-full h-full rounded-none'>
        <AvatarImage className='object-cover' src={coverPictureUrl} alt="cover-picture" />
        <AvatarFallback className='rounded-none text-center opacity-60'>Cover Goes Here</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default CoverImage