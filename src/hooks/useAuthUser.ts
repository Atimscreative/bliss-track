import { User } from "@/types";
import { createContext, useContext } from "react";

interface UserAuthContextType {
  user: User | any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const UserContext = createContext<UserAuthContextType | null>(null);

export default function useAuthUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
