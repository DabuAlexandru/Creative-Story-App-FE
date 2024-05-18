import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import AddEditNoteDialog from './AddEditNoteDialog'
import { NoteType } from '@/utils/types/section.types'

const ModalNoteDialog = ({ note, children, onReceiveResponse }: { note?: NoteType, children: ReactNode, onReceiveResponse: (note: NoteType) => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <AddEditNoteDialog note={note} onReceiveResponse={(note: NoteType) => {
        onReceiveResponse(note)
        setIsOpen(false)
      }} />
    </Dialog>
  )
}

export default ModalNoteDialog