"use client";

import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CVData } from "../../lib/types";

interface SummaryProps {
  cvData: CVData;

  editMode: boolean;

  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
}

export default function Summary({ editMode, cvData, handleInputChange }: SummaryProps) {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-2">Summary</h2>
      {editMode ? (
        <Textarea value={cvData.summary} onChange={(e) => handleInputChange("summary", null, null, e.target.value)} className="text-sm" />
      ) : (
        <p className="text-sm text-gray-700 leading-relaxed">{cvData.summary}</p>
      )}
    </section>
  );
}
