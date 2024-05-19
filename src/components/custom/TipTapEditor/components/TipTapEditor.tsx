import { ReactNode, useContext, useEffect } from 'react'
import { EditorProvider } from '@tiptap/react';
import { editorProps, extensions } from '../utils';
import EditStyleMenu from './EditorToolbar';
import { useParams } from 'react-router-dom';
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider';

const TipTapEditor = ({ children }: { children?: ReactNode }) => {
  const { storyId } = useParams()
  const { setStoryId } = useContext(TipTopEditorContext)

  useEffect(() => {
    if (!storyId) {
      return;
    }
    setStoryId(Number(storyId))
  }, [storyId])

  return (
    <EditorProvider
      slotBefore={<EditStyleMenu />}
      extensions={extensions}
      editorProps={editorProps}
      children={children}
    />
  )
}

export default TipTapEditor