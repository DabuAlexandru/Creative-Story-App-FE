
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const DropdownMenuOwnStory = ({ storyId, children }: { storyId: number | string, children: ReactNode }) => {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <DropdownMenuItem onClick={() => navigate(`/add-edit-story/${storyId}`)}>
          <span>Edit Story</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Reading Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { }}>
            <span>Statistics</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { }}>
          <span className='text-red-600'>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownMenuOwnStory