import { makeRequest } from '@/requests/request.handler'
import { retrieveAllSectionNotes } from '@/requests/section.note.requests'
import { NoteType, getNewNote } from '@/utils/types/section.types'
import { useContext, useEffect, useState } from 'react'
import NoteCard from './NoteCard'
import { Button } from '@/components/ui/button'
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider'

const NotesExplorer = () => {
  const { sectionId } = useContext(TipTopEditorContext)
  const [notes, setNotes] = useState<NoteType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
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
    <div className='absolute right-0 w-[12.5vw] h-[97.5vh] pt-14 px-2 bg-slate-300 text-slate-900 overflow-auto'>
      <h1 className='text-2xl text-center mb-2'>Notes</h1>
      <div className='flex justify-center'>
        <div className='flex gap-4 flex-col'>
          <div className='mt-4'>
            <Button className='w-[10vw]' onClick={() => {}}>New Note +</Button>
          </div>
          {notes.map(note => <NoteCard key={note.id} note={note} />)}
        </div>
      </div>
    </div>
  )
}

export default NotesExplorer