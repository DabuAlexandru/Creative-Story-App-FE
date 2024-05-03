import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { StateSetter } from "../types/general.types";
import { PictureDictType } from "../types/user.types";

type PictureContextProps = {
  picturesDict: PictureDictType,
  setPicturesDict: StateSetter<PictureDictType>
}

const PictureContext = createContext<PictureContextProps>({
  picturesDict: {},
  setPicturesDict: () => {}
});

const PictureContextProvider = ({ children }: { children: any }) => {
  const [picturesDict, setPicturesDict] = useLocalStorage<PictureDictType>("pictureURLs", {});

  const store: PictureContextProps = {
    picturesDict, setPicturesDict
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
