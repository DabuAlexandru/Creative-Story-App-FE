import TipTapEditorProvider, { TipTopEditorContext } from "@/utils/providers/TipTapEditorProvider"
import TipTapEditor from "./components/TipTapEditor"
// import { useContext, useEffect, useState } from "react"
import SectionsExplorer from "./components/SectionsExplorer"
import NotesExplorer from "./components/NotesExplorer"
// import { SectionType } from "@/utils/types/section.types"


const TipTapEditorWrapper = () => {
  // const { content, setContent } = useContext(TipTopEditorContext)
  // const [selectedSection, setSelectedSection] = useState<SectionType | null>(null)

  // useEffect(() => {
  //   setContent(selectedSection?.content || '')
  // }, [selectedSection])

  return (
    <TipTapEditorProvider>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <div className="w-[90%] h-[85vh] relative">
          <TipTapEditor />
        </div>
        <SectionsExplorer />
        <NotesExplorer />
      </div>
    </TipTapEditorProvider>
  )
}

export default TipTapEditorWrapper