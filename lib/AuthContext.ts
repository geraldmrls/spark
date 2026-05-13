import { createContext, useContext } from "react";

type AuthContextType = {
  isLogIn: boolean;
  setIsLogIn: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
