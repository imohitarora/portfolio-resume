"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiPlus as PlusIcon, FiTrash as TrashIcon } from "react-icons/fi";
import { CVData } from "../../lib/types";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface ExperienceProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
  removeItem: (section: keyof CVData, index: number) => void;
  addItem: (section: keyof CVData) => void;
}

export default function Experience({ editMode, cvData, handleInputChange, removeItem, addItem }: ExperienceProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-foreground mb-2">Experience</h2>
      <div className="space-y-4">
        {cvData.experience.map((exp, index) => (
          <div key={index} className="border-b pb-4 last:border-b-0">
            {editMode ? (
              <>
                <Input value={exp.title} onChange={(e) => handleInputChange("experience", index, "title", e.target.value)} className="text-sm font-semibold mb-1" />
                <Input value={exp.company} onChange={(e) => handleInputChange("experience", index, "company", e.target.value)} className="text-sm mb-1" />
                <Input value={exp.period} onChange={(e) => handleInputChange("experience", index, "period", e.target.value)} className="text-xs italic mb-1" />
                <Input
                  value={exp.responsibilities.join(", ")}
                  onChange={(e) => handleInputChange("experience", index, "responsibilities", e.target.value.split(", "))}
                  className="text-xs mb-1"
                />
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => removeItem("experience", index)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-sm font-semibold text-foreground">{exp.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {exp.company}, <span className="italic">{exp.period}</span>
                </p>
                <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
        {editMode && (
          <Button size="sm" variant="outline" className="h-6 text-xs" onClick={() => addItem("experience")}>
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Experience
          </Button>
        )}
      </div>
    </section>
  );
}
