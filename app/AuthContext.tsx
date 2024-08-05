"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseApp } from "./firebase/config";

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import { addWeeks, format } from "date-fns";

import { Program } from "@/interfaces/interfaces";
import { getPrograms, getProgramByURI } from "./api/programs-fetching";

interface ProgramData {
  uri: string;
  purchaseDate: string;
  expirationDate: string;
  content?: Program | null;
  isAdmin?: boolean;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  purchasedProgram: ProgramData | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasedProgram, setPurchasedProgram] = useState<ProgramData | null>(
    null
  );

  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userPurchaseRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userPurchaseRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const purchaseDate = data.purchaseDate.toDate();
          const expirationDate = addWeeks(purchaseDate, 7);
          const isAdmin = data.isAdmin === true;

          setPurchasedProgram({
            uri: data.programURI,
            purchaseDate: format(purchaseDate, "dd.MM.yyyy"),
            expirationDate: format(expirationDate, "dd.MM.yyyy"),
            isAdmin: isAdmin,
          });
        } else {
          setPurchasedProgram({
            uri: "",
            purchaseDate: "",
            expirationDate: "",
            isAdmin: false,
          });
        }
        setUser(user);
      } else {
        setUser(null);
        setPurchasedProgram(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    async function fetchProgramContent() {
      if (purchasedProgram?.isAdmin) {
        const content = await getPrograms();
        setPurchasedProgram((prevProgram) => {
          if (prevProgram === null) {
            return null;
          }
          return {
            ...prevProgram,
            content: content,
          };
        });
      } else if (purchasedProgram?.uri) {
        const content = await getProgramByURI(purchasedProgram.uri);
        setPurchasedProgram((prevProgram) => {
          if (prevProgram === null) {
            return null;
          }
          return {
            ...prevProgram,
            content: content,
          };
        });
      }
    }

    fetchProgramContent();
  }, [purchasedProgram?.uri]);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setPurchasedProgram(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, purchasedProgram }}>
      {children}
    </AuthContext.Provider>
  );
};
