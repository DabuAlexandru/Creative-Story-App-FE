import { NoteType } from '@/utils/types/section.types'

const NoteCard = ({
  note
}: {
  note: NoteType
}) => {
  return (
    <div className='size-[10vw] rounded-md bg-slate-50 hover:bg-slate-100 p-2 select-none cursor-pointer overflow-hidden flex flex-col'>
      <h2 className='text-center truncate font-semibold'>{note.title}</h2>
      <div className='h-full overflow-hidden'>
        <p className='pt-1 text-xs text-center h-full'>{note.content}</p>
      </div>
    </div>
  )
}

export default NoteCard