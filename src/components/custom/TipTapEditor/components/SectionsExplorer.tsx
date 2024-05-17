import { Button } from '@/components/ui/button'
import { makeRequest } from '@/requests/request.handler'
import { createNewSection, retrieveAllSections, updateSection } from '@/requests/section.requests'
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

  const onAddNewSection = async () => {
    const newSection = getNewSection()
    newSection.storyId = storyId
    newSection.displayOrder = sections.length + 1

    const createdSection = await makeRequest<SectionType>({ request: () => createNewSection(storyId, newSection) })
    if (!createdSection) {
      return;
    }
    setSections([...sections, createdSection])
  }

  const onEditSection = async (newSection: SectionType) => {
    const updatedSection = await makeRequest<SectionType>({ request: () => updateSection(newSection.id, newSection) })
    if (!updatedSection) {
      return;
    }

    const oldSectionIndex = sections.findIndex(s => s.id === newSection.id)
    const newSections = [...sections]
    newSections[oldSectionIndex] = updatedSection
    setSections(newSections)
  }

  return (
    <div className='absolute left-0 w-[12.5vw] h-[97.5vh] px-1 pt-14 bg-slate-300 text-slate-900'>
      <h1 className='text-2xl text-center mb-6'>Sections</h1>
      <div>
        {(sections || []).map(section => <SectionCard key={section?.id} section={section} setSection={onEditSection} />)}
      </div>
      <div className='w-full flex justify-center mt-4'>
        <Button onClick={onAddNewSection}>New Section +</Button>
      </div>
    </div>
  )
}

export default SectionsExplorer