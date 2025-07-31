import { useAuth } from "@/utils/hooks/useAuth";
import { ModeToggle } from "@/presentation/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 left-0 w-full z-50 flex items-center justify-between border-b bg-background px-4">
      <span className="flex items-center">
        <img
          src="/favicon.svg"
          alt="Franq"
          className="w-6 h-6"
          style={{ filter: "var(--logo-filter)" }}
        />
      </span>
      <div className="flex flex-row items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-9 h-9 p-0 rounded-full">
              <Avatar className="w-9 h-9">
                <AvatarFallback>
                  {user?.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <div className="px-3 py-2 text-sm text-muted-foreground border-b mb-1">
              {user?.name ?? "Usuário"}
              <div className="truncate text-xs opacity-60">{user?.email}</div>
            </div>
            <DropdownMenuItem
              onClick={logout}
              className="flex items-center gap-2 cursor-pointer text-red-600"
            >
              <LogOut size={16} /> Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}
