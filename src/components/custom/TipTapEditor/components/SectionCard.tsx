import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { SectionType } from "@/utils/types/section.types"
import { FileTextIcon } from "@radix-ui/react-icons"
import { useState, useRef, useEffect, useMemo, useCallback, useContext } from "react"
import { InlineInput } from "../../InlineInput/InlineInput"
import { debounce } from "lodash"
import { TipTopEditorContext } from "@/utils/providers/TipTapEditorProvider"
import { useCurrentEditor } from "@tiptap/react"
import { makeRequest } from "@/requests/request.handler"
import { retrieveSectionContent } from "@/requests/section.requests"

const SectionCard = ({
  section,
  setSection
}: {
  section: SectionType,
  setSection: (newSection: SectionType) => void
}) => {
  const { editor } = useCurrentEditor()
  const { sectionId, setSectionId } = useContext(TipTopEditorContext)
  const [sectionTitle, setSectionTitle] = useState<string>(section.title)
  const [editableMode, setEditableMode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSectionTitle = useCallback((oldSection: SectionType, newTitle: string) => {
    setSection({ ...oldSection, title: newTitle })
  }, [])

  const selectSection = async (newSectionId: number) => {
    setSectionId(newSectionId)
    if (!editor) {
      return null
    }
    editor.commands.clearContent()
    editor.setEditable(false)

    const contentResponse = await makeRequest<{ id: number, content: string }>({ request: () => retrieveSectionContent(newSectionId) })

    editor.setEditable(true)
    editor.commands.setContent(contentResponse?.content || '')
  }

  const debouncedSaveRequest = useMemo(() => debounce(updateSectionTitle, 300), [])

  useEffect(() => {
    return () => {
      debouncedSaveRequest.cancel()
    }
  }, [debouncedSaveRequest])

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Element)) {
      setEditableMode(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (editableMode && inputRef.current) {
      inputRef.current.select()
    }

    if (!editableMode && sectionTitle && section.title !== sectionTitle) {
      debouncedSaveRequest(section, sectionTitle)
    }
  }, [editableMode]);

  return (
    <div
      className={`m-1 px-2 rounded-md ${sectionId === section.id ? 'bg-slate-200 font-semibold' : 'bg-slate-50 font-normal'} cursor-pointer hover:bg-slate-100`}
      onClick={() => selectSection(section.id)}
      onDoubleClick={() => setEditableMode(!editableMode)}
      ref={containerRef}
    >
      <TooltipProvider>
        <Tooltip>
          <div className='flex gap-2 items-center'>
            <div><FileTextIcon /></div>
            {editableMode
              ? (<InlineInput
                value={sectionTitle}
                onChange={ev => setSectionTitle(ev.target.value || '')}
                ref={inputRef}
              />)
              : (<TooltipTrigger asChild>
                <span className='truncate select-none'>{sectionTitle}</span>
              </TooltipTrigger>)
            }
          </div>
          <TooltipContent>
            <p>{sectionTitle}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div >
  )
}

export default SectionCard