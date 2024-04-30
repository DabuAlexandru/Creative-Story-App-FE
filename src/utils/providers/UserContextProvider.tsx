import { createContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginRequest } from "@/requests/auth.requests";
import { APIResponseType } from "../types/general.types";
import { redirect } from "react-router-dom";
import { FavoriteType, ReadLaterType } from "../types/user.types";

export type UserType = {
  id: number;
  email: string;
};
export const emptyUser: UserType = {
  id: 0,
  email: "",
};

type LoginProps = {
  email: string
  password: string
}

type UserContextProps = {
  user: UserType
  token: string
  login: (props: LoginProps) => Promise<APIResponseType>
  logout: () => void
  isLogged: boolean
}

const UserContext = createContext<UserContextProps>({
  user: emptyUser,
  token: '',
  login: (_) => new Promise(() => false),
  logout: () => { },
  isLogged: false
});


const UserContextProvider = ({ children }: { children: any }) => {
  // In the localStorage we will remember only the auth token after the API is integrated
  // The user is saved in the localStorage just for the Mocking stage, to have a pseudo-authentification system
  const [user, setUser] = useLocalStorage<UserType>("user", emptyUser);
  const [token, setToken] = useLocalStorage<string>("jwt", '')

  const login = async ({
    email,
    password,
  }: LoginProps) => {
    const result = await loginRequest({ email, password })
    const loginResponse = result?.data;
    if (loginResponse?.user) {
      setUser(loginResponse.user);
      setToken(loginResponse.token);
    }
    return result;
  };

  const logout = () => {
    setUser(emptyUser);
    setToken('');
    redirect("/login");
  };

  const isLogged = Boolean(token);

  const store: UserContextProps = {
    user,
    token,
    login,
    logout,
    isLogged,
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
