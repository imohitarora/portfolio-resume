"use client";

import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiPaperclip, FiLinkedin, FiMail } from "react-icons/fi";
import { CVData } from "@/lib/types";
import { Input } from "@/components/ui/input";

export interface HeaderProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
}

export default function Header({ editMode, cvData, handleInputChange }: HeaderProps) {
  return (
    <header className="text-center mb-6">
      {editMode ? (
        <Input value={cvData.name} onChange={(e) => handleInputChange("name", null, null, e.target.value)} className="text-2xl font-bold text-center mb-2" />
      ) : (
        <h1 className="text-2xl font-bold text-gray-900">{cvData.name}</h1>
      )}
      {editMode ? (
        <Input value={cvData.title} onChange={(e) => handleInputChange("title", null, null, e.target.value)} className="text-lg text-center" />
      ) : (
        <p className="text-lg text-gray-600">{cvData.title}</p>
      )}
      <div className="flex justify-center space-x-4 mt-3">
        <a href={`https://github.com/${cvData.links.github}`} target="_blank" className="text-gray-600 hover:text-gray-900">
          <FiGithub className="h-5 w-5" />
        </a>
        <a href={`https://linkedin.com/in/${cvData.links.linkedin}`} target="_blank" className="text-gray-600 hover:text-gray-900">
          <FiLinkedin className="h-5 w-5" />
        </a>
        <a href={`https://x.com/${cvData.links.twitter}`} target="_blank" className="text-gray-600 hover:text-gray-900">
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a href={`${cvData.links.resume}`} target="_blank" className="text-gray-600 hover:text-gray-900">
          <FiPaperclip className="h-5 w-5" />
        </a>
        <a href={`mailto:${cvData.links.email}`} className="text-gray-600 hover:text-gray-900">
          <FiMail className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
