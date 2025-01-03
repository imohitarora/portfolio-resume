"use client";

import { FaXTwitter } from "react-icons/fa6";
import { FiGithub, FiPaperclip, FiLinkedin, FiMail } from "react-icons/fi";
import { CVData } from "@/lib/types";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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
        <Link href={`/`}>
          <h1 className="text-2xl font-bold text-foreground">{cvData.name}</h1>
        </Link>
      )}
      {editMode ? (
        <Input value={cvData.title} onChange={(e) => handleInputChange("title", null, null, e.target.value)} className="text-lg text-center" />
      ) : (
        <p className="text-lg text-muted-foreground">{cvData.title}</p>
      )}
      <div className="flex justify-center space-x-4 mt-3">
        <a href={`https://github.com/${cvData.links.github}`} target="_blank" className="text-muted-foreground hover:text-foreground">
          <FiGithub className="h-5 w-5" />
        </a>
        <a href={`https://linkedin.com/in/${cvData.links.linkedin}`} target="_blank" className="text-muted-foreground hover:text-foreground">
          <FiLinkedin className="h-5 w-5" />
        </a>
        <a href={`https://x.com/${cvData.links.twitter}`} target="_blank" className="text-muted-foreground hover:text-foreground">
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a href={`/Mohit_Arora_CV.pdf`} target="_blank" className="text-muted-foreground hover:text-foreground">
          <FiPaperclip className="h-5 w-5" />
        </a>
        <a href={`mailto:${cvData.links.email}`} className="text-muted-foreground hover:text-foreground">
          <FiMail className="h-5 w-5" />
        </a>
      </div>
    </header>
  );
}