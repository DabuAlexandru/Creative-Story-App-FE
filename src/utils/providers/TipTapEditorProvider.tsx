import { createContext, useState, FC } from "react";
import { StateSetter } from "../types/general.types";

type TipTopEditorContextProps = {
  content: string
  setContent: StateSetter<string>
  storyId: number
  setStoryId: StateSetter<number>
  sectionId: number
  setSectionId: StateSetter<number>
}

const TipTopEditorContext = createContext<TipTopEditorContextProps>({
  content: '',
  setContent: () => { },
  storyId: 0,
  setStoryId: () => { },
  sectionId: 0,
  setSectionId: () => { }
});

const TipTapEditorProvider: FC<{ children: React.ReactNode  }> = ({
  children,
}) => {
  const [content, setContent] = useState<string>('')
  const [storyId, setStoryId] = useState<number>(3)
  const [sectionId, setSectionId] = useState<number>(0)

  const storeForProvider: TipTopEditorContextProps = {
    content, setContent,
    storyId, setStoryId,
    sectionId, setSectionId
  }

  return (
    <TipTopEditorContext.Provider value={storeForProvider}>
      {children}
    </TipTopEditorContext.Provider>
  );
};

export { TipTopEditorContext };
export default TipTapEditorProvider;
