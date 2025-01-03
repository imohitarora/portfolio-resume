"use client";

import { Input } from "@/components/ui/input";
import { CVData } from "../../lib/types";
import React from "react";

interface EducationProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
}

export default function Education({ editMode, cvData, handleInputChange }: EducationProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-foreground mb-2">Education</h2>
      {cvData.education.map((edu, index) => (
        <div key={index} className="mb-2 last:mb-0">
          {editMode ? (
            <>
              <Input value={edu.degree} onChange={(e) => handleInputChange("education", null, "degree", e.target.value)} className="text-sm font-semibold mb-1" />
              <Input value={edu.school} onChange={(e) => handleInputChange("education", null, "school", e.target.value)} className="text-sm mb-1" />
              <Input value={edu.period} onChange={(e) => handleInputChange("education", null, "period", e.target.value)} className="text-xs italic" />
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-foreground">{edu.degree}</h3>
              <p className="text-xs text-muted-foreground">
                {edu.school}, <span className="italic">{edu.period}</span>
              </p>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
