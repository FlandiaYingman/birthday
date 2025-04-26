"use client";

import React, { ReactNode, Suspense } from "react";
import { Card } from "@/components/ui/card";

export default function BeginningLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="m-auto flex h-screen w-screen flex-col items-center justify-center text-3xl">
      <Card className="bg-main text-main-foreground min-h-[var(--container-sm)] max-w-sm min-w-sm px-2 py-8">
        <Suspense>{children}</Suspense>
      </Card>
    </main>
  );
}
