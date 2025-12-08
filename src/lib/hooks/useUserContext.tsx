"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type User = { id: string; email: string; name: string } | null;

const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User>(null);

  // Load user from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        console.error("Invalid user JSON in localStorage");
      }
    }
  }, []);

  // Sync with localStorage when user changes
  const setUser = (newUser: User) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
