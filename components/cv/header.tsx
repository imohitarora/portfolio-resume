"use client";

import { Switch } from "@/components/ui/switch";
import { CVData } from "../../lib/types";
import { Input } from "../ui/input";
import { FiGithub as GithubIcon, FiLinkedin as LinkedinIcon, FiMail as MailIcon, FiExternalLink as ExternalLinkIcon, FiPlus as PlusIcon, FiTrash as TrashIcon } from "react-icons/fi";

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
        <a href="mailto:jane@example.com" className="text-gray-600 hover:text-gray-900">
          <MailIcon className="h-5 w-5" />
        </a>
        <a href="https://github.com/janedoe" className="text-gray-600 hover:text-gray-900">
          <GithubIcon className="h-5 w-5" />
        </a>
        <a href="https://linkedin.com/in/janedoe" className="text-gray-600 hover:text-gray-900">
          <LinkedinIcon className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}
