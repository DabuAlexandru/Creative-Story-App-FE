import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorProps } from '@tiptap/pm/view'
import { Extensions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import { z } from "zod"

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

export const sectionNoteSchema = z.object({
  title: z
      .string({
          required_error: "Title is required",
          invalid_type_error: "Title must be a string"
      })
      .min(1, { message: "Title must not be empty!" }),
  content: z
      .string({
          required_error: "Content is required",
          invalid_type_error: "Content must be a string"
      })
      .min(1, { message: "Content must not be empty!" }),
});

export const formFieldStyle: React.CSSProperties = {
  marginTop: '8px'
}