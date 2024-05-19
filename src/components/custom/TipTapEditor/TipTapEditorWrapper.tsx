import TipTapEditorProvider from "@/utils/providers/TipTapEditorProvider"
import TipTapEditor from "./components/TipTapEditor"
import SectionsExplorer from "./components/SectionsExplorer"
import NotesExplorer from "./components/NotesExplorer"

const TipTapEditorWrapper = () => {
  return (
    <TipTapEditorProvider>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <div className="w-[90%] h-[85vh]">
          <TipTapEditor>
            <div className="absolute top-0 left-0 flex justify-between w-full">
              <SectionsExplorer />
              <NotesExplorer />
            </div>
          </TipTapEditor>
        </div>
      </div>
    </TipTapEditorProvider>
  )
}

export default TipTapEditorWrapper