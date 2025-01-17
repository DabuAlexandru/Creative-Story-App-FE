import { Button } from "@/components/ui/button"
import { makeRequest } from "@/requests/request.handler"
import { updateSectionContent } from "@/requests/section.requests"
import { TipTopEditorContext } from "@/utils/providers/TipTapEditorProvider"
import { AlignCenterHorizontallyIcon, AlignLeftIcon, AlignRightIcon, FontBoldIcon, FontItalicIcon, StrikethroughIcon, TextAlignJustifyIcon, UnderlineIcon } from "@radix-ui/react-icons"
import { useCurrentEditor } from "@tiptap/react"
import { useContext } from "react"

const EditStyleMenu = () => {
  const { editor } = useCurrentEditor()
  const { sectionId } = useContext(TipTopEditorContext)

  if (!editor) {
    return null
  }

  return (
    <div className="relative top-0 text-black z-20 flex gap-1 bg-slate-300 w-full h-[5vh] justify-center rounded-sm">
      <Button
        variant="ghost"
        onClick={() => {
          const futureContent = editor.getHTML()
          makeRequest({ request: () => updateSectionContent(sectionId, futureContent) })
        }}
        className='absolute left-0'
      >
        Save
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <FontBoldIcon />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <FontItalicIcon />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <UnderlineIcon />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <StrikethroughIcon />
      </Button>

      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        disabled={!editor.can().chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        <AlignLeftIcon />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        disabled={!editor.can().chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        <AlignCenterHorizontallyIcon />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        disabled={!editor.can().chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        <AlignRightIcon />
      </Button>
      <Button
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        disabled={!editor.can().chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        <TextAlignJustifyIcon />
      </Button>
    </div>
  )
}

export default EditStyleMenu