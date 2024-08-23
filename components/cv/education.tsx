"use client";

import { Input } from "@/components/ui/input";
import { CVData } from "../../lib/types";

interface EducationProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
}

export default function Education({ editMode, cvData, handleInputChange }: EducationProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
      {cvData.education.map((edu, index) => (
        <div key={index}>
          {editMode ? (
            <>
              <Input value={edu.degree} onChange={(e) => handleInputChange("education", null, "degree", e.target.value)} className="text-sm font-semibold mb-1" />
              <Input value={edu.school} onChange={(e) => handleInputChange("education", null, "school", e.target.value)} className="text-sm mb-1" />
              <Input value={edu.period} onChange={(e) => handleInputChange("education", null, "period", e.target.value)} className="text-xs italic" />
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-xs text-gray-600">
                {edu.school}, <span className="italic">{edu.period}</span>
              </p>
            </>
          )}
        </div>
      ))}
    </section>
  );
}
