import { UserContext } from "@/hooks/useAuthUser";
import { account, ID } from "@/services/appwrite";
import { User } from "@/types";
import React, { useEffect, useState } from "react";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function login(email: string, password: string) {
    setIsLoading(false);
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    window.location.replace("/");
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email: string, password: string) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
      console.log(err);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
