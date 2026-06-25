'use client';

import { ReactNode } from 'react';

interface ARShellProps {
  children: ReactNode;
}

export function ARShell({ children }: ARShellProps) {
  return (
    <div className="relative w-full h-dvh overflow-hidden bg-[#020408]">
      {children}
    </div>
  );
}
