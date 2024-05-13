import { makeRequest } from '@/requests/request.handler'
import { retrieveAllSectionNotesPaginate } from '@/requests/section.note.requests'
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider'
import { Paginated, emptyPaginated } from '@/utils/types/general.types'
import { NoteType } from '@/utils/types/section.types'
import { useContext, useEffect, useState } from 'react'

const SECTION_NOTE_COUNT = 6

const NotesExplorer = () => {
  const { sectionId } = useContext(TipTopEditorContext)
  const [paginatedNotes, setPaginatedNotes] = useState<Paginated<NoteType>>(emptyPaginated)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    if (!sectionId) {
      return
    }
    makeRequest({
      request: () => retrieveAllSectionNotesPaginate({ sectionId, page: currentPage - 1, size: SECTION_NOTE_COUNT }),
      setObject: setPaginatedNotes,
      setIsLoading
    })
  }, [sectionId])


  return (
    <div className='absolute right-0 w-[12.5vw] h-[97.5vh] pt-14 bg-slate-300 font-black text-slate-900 flex justify-center'>
      <h1 className='text-2xl'>Notes</h1>
    </div>
  )
}

export default NotesExplorer