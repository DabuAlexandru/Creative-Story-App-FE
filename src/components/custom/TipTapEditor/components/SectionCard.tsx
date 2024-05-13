import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { SectionType } from "@/utils/types/section.types"
import { FileTextIcon } from "@radix-ui/react-icons"
import { useState, useRef, useEffect } from "react"
import { InlineInput } from "../../InlineInput/InlineInput"

const SectionCard = ({
  section,
  setSection
}: {
  section: SectionType,
  setSection: (newSection: SectionType) => void
}) => {
  const [editableMode, setEditableMode] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
  }, [editableMode]);

  return (
    <div
      className='m-1 px-2 rounded-md bg-slate-100'
      onDoubleClick={() => setEditableMode(!editableMode)}
      ref={containerRef}
    >
      <TooltipProvider>
        <Tooltip>
          <div className='flex gap-2 items-center'>
            <div><FileTextIcon /></div>
            {editableMode
              ? (<InlineInput
                value={section.title}
                onChange={ev => setSection({ ...section, title: ev.target.value })}
                ref={inputRef}
              />)
              : (<TooltipTrigger asChild>
                <span className='truncate select-none'>{section.title}</span>
              </TooltipTrigger>)
            }
          </div>
          <TooltipContent>
            <p>{section.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div >
  )
}

export default SectionCard