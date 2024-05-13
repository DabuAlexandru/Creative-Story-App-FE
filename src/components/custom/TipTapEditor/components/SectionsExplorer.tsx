import { Button } from '@/components/ui/button'
import { makeRequest } from '@/requests/request.handler'
import { retrieveAllSections } from '@/requests/section.requests'
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider'
import { SectionType, getNewSection } from '@/utils/types/section.types'
import { useContext, useEffect, useState } from 'react'
import SectionCard from './SectionCard'

const SectionsExplorer = () => {
  const { storyId } = useContext(TipTopEditorContext)
  const [sections, setSections] = useState<SectionType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    makeRequest({
      request: () => retrieveAllSections(storyId),
      setObject: setSections,
      setIsLoading
    })
  }, [storyId])

  return (
    <div className='absolute left-0 w-[12.5vw] h-[97.5vh] px-1 pt-14 bg-slate-300 text-slate-900 justify-center'>
      <h1 className='text-2xl'>Sections</h1>
      <div>
        {(sections || []).map(section => <SectionCard section={section} setSection={function (newSection: SectionType): void {
          setSections([newSection])
        }} />)}
      </div>
      <div className='w-full flex justify-center mt-4'>
        <Button onClick={() => {
          const newSection = getNewSection()
          newSection.storyId = storyId
          newSection.displayOrder = sections.length + 1
          setSections([...sections, newSection])
        }}>New Section +</Button>
      </div>
    </div>
  )
}

export default SectionsExplorer