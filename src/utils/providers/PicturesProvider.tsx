import { ReactNode, createContext, useMemo, useState } from "react";
import { StateSetter } from "../types/general.types";
import { PictureDictType } from "../types/user.types";
import { getAndSetPicture } from "../helpers/helper.file";

type FetchPicturePropsType = {
  category: 'profile' | 'cover'
  fileName: string
  setPictureUrl: StateSetter<string>
}
type PictureContextProps = {
  picturesDict: PictureDictType,
  setPicturesDict: StateSetter<PictureDictType>
  getAndSetPictureURL: (payload: FetchPicturePropsType) => void
}

const PictureContext = createContext<PictureContextProps>({
  picturesDict: {},
  setPicturesDict: () => {},
  getAndSetPictureURL: () => {}
});


const PictureContextProvider = ({ children }: { children: ReactNode }) => {
  const [picturesDict, setPicturesDict] = useState<PictureDictType>({})

  const getAndSetPictureURL = async ({
    category,
    fileName,
    setPictureUrl
  }: FetchPicturePropsType) => {
    if (!picturesDict) {
      return;
    }
    const idKey = `${category}-${fileName}`
    const futurePictureUrl = picturesDict[idKey]
    if (futurePictureUrl) {
      setPictureUrl(futurePictureUrl)
    } else {
      const pictureURL = await getAndSetPicture(fileName, setPictureUrl)
      setPicturesDict({...picturesDict, [idKey]: pictureURL })
    }
  }

  const store: PictureContextProps = {
    picturesDict, setPicturesDict, getAndSetPictureURL
  };

  const storeForProvider = useMemo(() => store, [store]);
  return (
    <PictureContext.Provider value={storeForProvider}>
      {children}
    </PictureContext.Provider>
  );
};

export { PictureContext };
export default PictureContextProvider;
