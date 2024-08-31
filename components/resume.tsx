"use client";

import { usePathname } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CVData } from "@/lib/types";
import { useEffect, useState } from "react";
import Education from "./cv/education";
import Experience from "./cv/experience";
import Header from "./cv/header";
import Portfolio from "./cv/portfolio";
import Skills from "./cv/skills";
import Summary from "./cv/summary";
import EditModeSwitch from "./cv/edit-mode-switch";
import Blogs from "./cv/blogs";
import { signIn, signOut, useSession } from "next-auth/react";

interface ResumeComponentProps {
  initialData: CVData;
}

export default function ResumeComponent({ initialData }: ResumeComponentProps) {
  const [editMode, setEditMode] = useState(false);
  const [cvData, setCvData] = useState<CVData>(initialData);
  const { data: session, status } = useSession();

  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsAdminRoute(pathname.includes("/admin"));
  }, [pathname]);

  useEffect(() => {
    if (!session) {
      setEditMode(false);
    }
  }, [session]);

  const handleInputChange = (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => {
    setCvData((prevData) => {
      if (Array.isArray(prevData[section])) {
        const newArray = [...(prevData[section] as any[])];
        if (field) {
          newArray[index as number] = { ...newArray[index as number], [field]: value };
        } else {
          newArray[index as number] = value;
        }
        return { ...prevData, [section]: newArray };
      } else if (typeof prevData[section] === "object") {
        return { ...prevData, [section]: { ...(prevData[section] as object), [field as string]: value } };
      } else {
        return { ...prevData, [section]: value };
      }
    });
  };

  const addItem = (section: keyof CVData) => {
    setCvData((prevData) => ({
      ...prevData,
      [section]: [
        ...(prevData[section] as any[]),
        section === "skills" ? "" : section === "blogs" ? { title: "", summary: "", url: "" } : section === "portfolio" ? { title: "", description: "", tech: [], liveUrl: "", githubUrl: "" } : {},
      ],
    }));
  };

  const removeItem = (section: keyof CVData, index: number) => {
    setCvData((prevData) => ({
      ...prevData,
      [section]: (prevData[section] as any[]).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <EditModeSwitch editMode={editMode} isAdminRoute={isAdminRoute} isAuthenticated={!!session} setEditMode={setEditMode} />
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <Header cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} />
            <Summary cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} />
            <Skills cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} addItem={addItem} removeItem={removeItem} />
            <Portfolio cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} addItem={addItem} removeItem={removeItem} />
            <Experience cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} addItem={addItem} removeItem={removeItem} />
            <Education cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} />
            <Blogs cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} addItem={addItem} removeItem={removeItem} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
