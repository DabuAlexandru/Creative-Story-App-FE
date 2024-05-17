import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { SectionType } from "@/utils/types/section.types"
import { FileTextIcon } from "@radix-ui/react-icons"
import { useState, useRef, useEffect, useMemo, useCallback, useContext } from "react"
import { InlineInput } from "../../InlineInput/InlineInput"
import { debounce } from "lodash"
import { TipTopEditorContext } from "@/utils/providers/TipTapEditorProvider"

const SectionCard = ({
  section,
  setSection
}: {
  section: SectionType,
  setSection: (newSection: SectionType) => void
}) => {
  const { sectionId, setSectionId } = useContext(TipTopEditorContext)
  const [sectionTitle, setSectionTitle] = useState<string>(section.title)
  const [editableMode, setEditableMode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateSectionTitle = useCallback((oldSection: SectionType, newTitle: string) => {
    setSection({...oldSection, title: newTitle})
  }, [])

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
      onClick={() => setSectionId(section.id)}
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