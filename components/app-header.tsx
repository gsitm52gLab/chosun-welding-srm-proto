"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppHeaderProps {
  title: string;
  userName: string;
  companyName?: string;
}

export function AppHeader({ title, userName, companyName }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              {userName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {companyName ? `${companyName} ${userName}님` : `조선선재 ${userName}님`}
          </span>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <LogOut className="mr-1 h-4 w-4" />
            로그아웃
          </Button>
        </Link>
      </div>
    </header>
  );
}
