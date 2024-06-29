import { NoteType } from '@/utils/types/section.types'
import ModalNoteDialog from './ModalNoteDialog'

const NoteCard = ({
  note,
  onSuccessAddEditNote
}: {
  note: NoteType
  onSuccessAddEditNote: (note: NoteType) => void
}) => {
  return (
    <ModalNoteDialog note={note} onReceiveResponse={onSuccessAddEditNote}>
      <div className='size-[10vw] min-h-[10vw] min-w-[10vw] rounded-md bg-slate-50 hover:bg-slate-100 p-2 select-none cursor-pointer overflow-hidden flex flex-col'>
        <h2 className='text-center truncate font-semibold'>{note.title}</h2>
        <div className='h-full overflow-hidden'>
          <p className='pt-1 text-xs text-center h-full'>{note.content}</p>
        </div>
      </div>
    </ModalNoteDialog>
  )
}

export default NoteCard