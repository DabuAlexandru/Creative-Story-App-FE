import { ReactNode, createContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginRequest } from "@/requests/auth.requests";
import { APIResponseType, FlexibleObject, PictureType, StateSetter } from "../types/general.types";
import { redirect } from "react-router-dom";
import { BaseUserProfileType, FavoriteType, ReadLaterType, UserProfileType, emptyBaseUserProfileType } from "../types/user.types";
import { toNumber } from "../helpers/helper.string";
import { getUserProfile } from "@/requests/user.profile.requests";
import { toast } from "@/components/ui/use-toast";
import { clearStorageData } from "@/requests/axiosHandler/axios.handler";

type LoginProps = {
  email: string
  password: string
}

type UserContextProps = {
  token: string
  login: (props: LoginProps) => Promise<APIResponseType>
  logout: () => void
  isLogged: boolean
  favorites: FavoriteType[]
  setFavorites: StateSetter<FavoriteType[]>
  favoritesSet: Set<number>
  readLater: ReadLaterType[]
  setReadLater: StateSetter<ReadLaterType[]>
  readLaterSet: Set<number>
  profileInfo: BaseUserProfileType
  setProfileInfo: StateSetter<BaseUserProfileType>
  profilePicture: PictureType
  setProfilePicture: StateSetter<PictureType>
}

const UserContext = createContext<UserContextProps>({
  token: '',
  login: (_) => new Promise(() => false),
  logout: () => { },
  isLogged: false,
  favorites: [],
  setFavorites: () => { },
  favoritesSet: new Set([]),
  readLater: [],
  setReadLater: () => { },
  readLaterSet: new Set([]),
  profileInfo: emptyBaseUserProfileType,
  setProfileInfo: () => { },
  profilePicture: { fileName: '', userId: 0 },
  setProfilePicture: () => { }
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteType[]>("favorites", [])
  const favoritesSet: Set<number> = useMemo(() => (new Set(favorites.map(f => toNumber(f.storyId)))), [favorites])
  const [readLater, setReadLater] = useLocalStorage<ReadLaterType[]>("read-later", [])
  const readLaterSet: Set<number> = useMemo(() => (new Set(readLater.map(f => toNumber(f.storyId)))), [readLater])
  const [profileInfo, setProfileInfo] = useLocalStorage<BaseUserProfileType>("profile-info", emptyBaseUserProfileType)
  const [profilePicture, setProfilePicture] = useLocalStorage<PictureType>("profile-picture", { fileName: '', userId: 0 })
  const [token, setToken] = useLocalStorage<string>("jwt", '')

  const onLoginSuccess = useCallback(async (loginResponse: { user: FlexibleObject, token: string }) => {
    setToken(loginResponse.token);

    const userProfileResponse = await getUserProfile();
    if (userProfileResponse.error) {
      toast({
        variant: "destructive",
        title: "Couldn't retrieve user info!",
        description: userProfileResponse.message
      })
      return
    }
    const userProfileData: UserProfileType = userProfileResponse.data

    const baseUserProfile: BaseUserProfileType = {
      id: userProfileData.id,
      penName: userProfileData.penName,
      fullName: userProfileData.fullName,
      headline: userProfileData.headline,
      bio: userProfileData.bio,
      website: userProfileData.website,
      location: userProfileData.location
    }
    const futureReadLater = userProfileData.readingLists
    const futureFavorites = userProfileData.favorites
    const futureProfilePicture = userProfileData.profilePicture

    setProfileInfo(baseUserProfile)
    setReadLater(futureReadLater)
    setFavorites(futureFavorites)
    setProfilePicture(futureProfilePicture)
  }, [])

  const login = async ({
    email,
    password,
  }: LoginProps) => {
    const result = await loginRequest({ email, password })
    const loginResponse = result?.data;
    if (loginResponse?.token) {
      onLoginSuccess(loginResponse)
    }
    return result;
  };

  const logout = () => {
    setToken('');

    clearStorageData()
    redirect("/login");
  };

  const isLogged = Boolean(token);

  const store: UserContextProps = {
    token, login, logout, isLogged,
    favorites, setFavorites, favoritesSet,
    readLater, setReadLater, readLaterSet,
    profileInfo, setProfileInfo,
    profilePicture, setProfilePicture
  };

  const storeForProvider = useMemo(() => store, [store]);
  return (
    <UserContext.Provider value={storeForProvider}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserContextProvider;
