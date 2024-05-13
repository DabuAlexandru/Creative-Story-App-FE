import { ReactNode, useContext } from 'react'
import { EditorProvider } from '@tiptap/react';
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider';
import { editorProps, extensions } from '../utils';
import EditStyleMenu from './EditorToolbar';

const TipTapEditor = ({ children }: { children?: ReactNode }) => {
  const { content } = useContext(TipTopEditorContext)

  return (
    <EditorProvider
      slotBefore={<EditStyleMenu />}
      extensions={extensions}
      content={content}
      editorProps={editorProps}
      children={children}
    />
  )
}

export default TipTapEditor