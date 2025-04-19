import { AuthContext } from "@/hooks/useAuth";
import { users } from "@/services/mockData";
import { User } from "@/types";
import React, { useState, useEffect } from "react";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage (simple persistence)
    const savedUser = localStorage.getItem("blisstrack_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    console.log(password);

    try {
      // Mock login - in real app, this would call an API
      // For demo, we'll accept any valid email from our mock users and any password
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      // Simulate server delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setCurrentUser(user);
      localStorage.setItem("blisstrack_user", JSON.stringify(user));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("blisstrack_user");
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
