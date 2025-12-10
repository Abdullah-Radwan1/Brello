import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/hooks/useUserContext";
import { signout } from "@/api/auth";
import { useQueryClient } from "@tanstack/react-query";

export function Navbar() {
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally, call /auth/logout endpoint to clear cookie
    signout();
    setUser(null);
    navigate("/signin");
    queryClient.clear();
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-bold text-xl"
        >
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span>TaskFlow</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name ?? "Guest"}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email ?? "-"}
                  </p>
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
