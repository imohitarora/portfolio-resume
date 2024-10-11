"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FiLogOut as LogOutIcon, FiGithub as GithubIcon } from "react-icons/fi";
import { signIn, signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/theme-toggle";

interface EditModeSwitchProps {
  editMode: boolean;
  isAuthenticated: boolean;
  isAdminRoute: boolean;
  setEditMode: (value: boolean) => void;
}

export default function EditModeSwitch({ editMode, isAdminRoute, isAuthenticated, setEditMode }: EditModeSwitchProps) {
  if (!isAdminRoute) return null;

  const handleLogin = () => signIn("github");
  const handleLogout = () => signOut();

  return (
    <div className="flex justify-end mb-4 space-x-4">
      {isAdminRoute &&
        (isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="edit-mode" checked={editMode} onCheckedChange={setEditMode} aria-label="Toggle edit mode" />
              <label htmlFor="edit-mode" className="text-sm font-medium text-muted-foreground">
                Edit Mode
              </label>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOutIcon className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        ) : (
          <Button onClick={handleLogin} variant="outline" size="sm">
            <GithubIcon className="h-4 w-4 mr-2" />
            Login with GitHub
          </Button>
        ))}
    </div>
  );
}
