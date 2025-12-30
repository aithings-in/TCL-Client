"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

type LeagueType = "T10" | "T20";

const LeagueTypeContext = createContext<
  | {
      leagueType: LeagueType;
      toggleLeagueType: () => void;
      setLeagueType: (type: LeagueType) => void;
    }
  | undefined
>(undefined);

const LEAGUE_TYPE_STORAGE_KEY = "tcl-league-type";

export const useLeagueType = () => {
  const context = useContext(LeagueTypeContext);
  if (context === undefined) {
    throw new Error("useLeagueType must be used within a LeagueTypeProvider");
  }
  return context;
};

export const LeagueTypeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Start with default value to avoid hydration mismatch
  // We'll sync with localStorage after mount (client-side only)
  const [leagueType, setLeagueTypeState] = useState<LeagueType>("T20");
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(LEAGUE_TYPE_STORAGE_KEY);
      if (stored === "T10" || stored === "T20") {
        setLeagueTypeState(stored);
      }
    } catch (error) {
      console.error("Failed to read league type from localStorage", error);
    }
  }, []);

  // Save to localStorage when leagueType changes (but only after mount)
  useEffect(() => {
    if (!isMounted) return; // Don't save until after initial load

    try {
      localStorage.setItem(LEAGUE_TYPE_STORAGE_KEY, leagueType);
      // Dispatch a custom event so components can listen for changes
      window.dispatchEvent(
        new CustomEvent("leagueTypeChanged", { detail: leagueType })
      );
    } catch (error) {
      console.error("Failed to save league type to localStorage", error);
    }
  }, [leagueType, isMounted]);

  const setLeagueType = useCallback((type: LeagueType) => {
    setLeagueTypeState(type);
  }, []);

  const toggleLeagueType = useCallback(() => {
    setLeagueTypeState((prev) => {
      const newType = prev === "T10" ? "T20" : "T10";
      return newType;
    });
  }, []);

  const value = useMemo(
    () => ({
      leagueType,
      toggleLeagueType,
      setLeagueType,
    }),
    [leagueType, toggleLeagueType, setLeagueType]
  );

  return (
    <LeagueTypeContext.Provider value={value}>
      {children}
    </LeagueTypeContext.Provider>
  );
};
