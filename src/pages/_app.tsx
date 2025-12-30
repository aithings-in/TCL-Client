"use client";

import type { AppProps } from "next/app";
import { LeagueTypeProvider } from "@/hooks/useLeagueType";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LeagueTypeProvider>
      <Component {...pageProps} />
    </LeagueTypeProvider>
  );
}
