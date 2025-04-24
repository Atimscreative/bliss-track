import { AuthContext } from "@/hooks/useAuth";
import { account, databases, ID } from "@/services/appwrite";
import { DATABASE_ID, USER_COLLECTION } from "@/services/config";
import { users } from "@/services/mockData";
import { User, UserRole } from "@/types";
import React, { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | any>(users[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function login(email: string, password: string) {
    setIsLoading(true);

    try {
      const loggedIn = await account.createEmailPasswordSession(
        email,
        password
      );
      setUser(loggedIn);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function register(data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }) {
    const { email, password, name, role } = data;
    try {
      const creatAcc = await account.create(ID.unique(), email, password);
      const db = await databases.createDocument(
        DATABASE_ID, // databaseId
        USER_COLLECTION, // collectionId
        ID.unique(), // documentId
        {
          userId: creatAcc.$id,
          email,
          name,
          role,
        } // data
      );

      await login(email, password);

      console.log(db, creatAcc, "DB,  CREATE-ACC");
    } catch (error) {
      console.log(error);
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      await databases.listDocuments(
        "<DATABASE_ID>", // databaseId
        "<COLLECTION_ID>", // collectionId
        [] // queries (optional)
      );
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
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
