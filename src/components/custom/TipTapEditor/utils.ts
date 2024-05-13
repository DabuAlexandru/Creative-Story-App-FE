import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorProps } from '@tiptap/pm/view'
import { Extensions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'

export const extensions: Extensions = [
  StarterKit,
  Typography,
  Color,
  TextStyle,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Underline
]

export const editorProps: EditorProps = {
  attributes: {
    class: 'w-full h-[85vh] overflow-auto px-16 py-12 bg-white text-black rounded-sm',
  }
}