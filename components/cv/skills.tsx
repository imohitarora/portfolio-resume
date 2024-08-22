"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiPlus as PlusIcon, FiTrash as TrashIcon } from "react-icons/fi";
import { CVData } from "../../lib/types";

interface SkillsProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
  removeItem: (section: keyof CVData, index: number) => void;
  addItem: (section: keyof CVData) => void;
}

export default function Skills({ editMode, cvData, handleInputChange, removeItem, addItem }: SkillsProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Skills</h2>
      <div className="flex flex-wrap gap-1.5">
        {cvData.skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            {editMode ? (
              <Input value={skill} onChange={(e) => handleInputChange("skills", index, null, e.target.value)} className="text-xs w-24 mr-1" />
            ) : (
              <Badge variant="secondary" className="text-xs">
                {skill}
              </Badge>
            )}
            {editMode && (
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => removeItem("skills", index)}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {editMode && (
          <Button size="sm" variant="outline" className="h-6 text-xs" onClick={() => addItem("skills")}>
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Skill
          </Button>
        )}
      </div>
    </section>
  );
}
