"use client";

import { Switch } from "@/components/ui/switch";

interface EditModeSwitchProps {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
}

export default function EditModeSwitch({ editMode, setEditMode }: EditModeSwitchProps) {
  return (
    <div className="flex justify-end mb-4">
      <div className="flex items-center space-x-2">
        <Switch id="edit-mode" checked={editMode} onCheckedChange={setEditMode} />
        <label htmlFor="edit-mode" className="text-sm font-medium text-gray-700">
          Edit Mode
        </label>
      </div>
    </div>
  );
}
