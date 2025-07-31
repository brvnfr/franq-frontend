import React from "react";
import { ModeToggle } from "@/presentation/components/ModeToggle";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted relative">
      <div className="absolute top-6 right-6">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
