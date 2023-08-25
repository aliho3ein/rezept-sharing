import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { userWithId } from "../models/user";

interface ContextType {
  user: userWithId | undefined;
  setUser: Dispatch<SetStateAction<userWithId | undefined>>;
}

export const AuthContext = createContext({} as ContextType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<userWithId | undefined>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
