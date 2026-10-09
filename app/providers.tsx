"use client";

import { SWRConfig } from "swr";
import type { ReactNode } from "react";
import { apiFetcher } from "@/lib/api";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: apiFetcher,
        revalidateOnFocus: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
