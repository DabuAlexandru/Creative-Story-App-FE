import { makeRequest } from '@/requests/request.handler'
import { retrieveAllSectionNotes } from '@/requests/section.note.requests'
import { NoteType } from '@/utils/types/section.types'
import { useCallback, useContext, useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import { Button } from '@/components/ui/button'
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider'
import ModalNoteDialog from './ModalNoteDialog'

const NotesExplorer = () => {
  const { sectionId } = useContext(TipTopEditorContext)
  const [notes, setNotes] = useState<NoteType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSuccessAddEditNote = useCallback((note: NoteType) => {
    setNotes((oldNotes: NoteType[]) => {
      let newNotes = [...oldNotes]
      newNotes = newNotes.filter((oldNote) => oldNote.id != note.id)
      return [note, ...newNotes]
    })
  }, [])

  useEffect(() => {
    if (!sectionId) {
      return
    }
    makeRequest({
      request: () => retrieveAllSectionNotes(sectionId),
      setObject: setNotes,
      setIsLoading
    })
  }, [sectionId])

  return (
    <div className='w-[12.5vw] pt-14 bg-slate-300 text-slate-900'>
      <div className=' flex flex-col items-center bg-slate-300 pb-4'>
        <h1 className='text-2xl text-center mb-2'>Notes</h1>
        <div className='mt-4'>
          <ModalNoteDialog onReceiveResponse={onSuccessAddEditNote}>
            <Button disabled={!sectionId || isLoading} className='w-[10vw]'>New Note +</Button>
          </ModalNoteDialog>
        </div>
      </div>
      <div className='flex justify-center px-2 py-4 overflow-auto max-h-[60vh]'>
        <div className='flex gap-4 flex-col items-center'>
          {Boolean(!sectionId || isLoading)
            ? null
            : notes.map(note =>
              <NoteCard key={note.id} note={note} onSuccessAddEditNote={onSuccessAddEditNote} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default NotesExplorer