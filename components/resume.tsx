"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CVData } from "@/lib/types";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Blogs from "./cv/blogs";
import EditModeSwitch from "./cv/edit-mode-switch";
import Education from "./cv/education";
import Experience from "./cv/experience";
import Header from "./cv/header";
import Portfolio from "./cv/portfolio";
import Skills from "./cv/skills";
import Summary from "./cv/summary";

interface ResumeComponentProps {
  initialData: CVData;
}

export default function ResumeComponent({ initialData }: ResumeComponentProps) {
  const [editMode, setEditMode] = useState(false);
  const [cvData, setCvData] = useState<CVData>(initialData);
  const { data: session, status } = useSession();
  const [visibleBlogPosts, setVisibleBlogPosts] = useState(4);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  const [currentPortfolioPage, setCurrentPortfolioPage] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    setIsAdminRoute(pathname.includes("/admin"));
  }, [pathname]);

  useEffect(() => {
    if (!session) {
      setEditMode(false);
    }
  }, [session]);

  const updatePortfolioData = async (data: CVData) => {
    try {
      const response = await fetch('/api/portfolio/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update portfolio');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating portfolio:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!editMode && JSON.stringify(cvData) !== JSON.stringify(initialData)) {
      updatePortfolioData(cvData)
        .then(() => console.log("Portfolio data updated successfully"))
        .catch((error) => {
          console.error("Error updating portfolio data:", error);
          // You might want to show an error message to the user here
        });
    }
  }, [editMode, cvData, initialData]);

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

  const loadMoreBlogs = () => {
    setVisibleBlogPosts((prevVisible) => prevVisible + 4);
  };

  const nextPortfolioPage = () => {
    setCurrentPortfolioPage((prev) => ((prev + 1) * 4 >= cvData.portfolio.length ? 0 : prev + 1));
  };

  const prevPortfolioPage = () => {
    setCurrentPortfolioPage((prev) => (prev === 0 ? Math.floor((cvData.portfolio.length - 1) / 4) : prev - 1));
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
            <Portfolio
              cvData={cvData}
              editMode={editMode}
              handleInputChange={handleInputChange}
              addItem={addItem}
              removeItem={removeItem}
              currentPortfolioPage={currentPortfolioPage}
              prevPortfolioPage={prevPortfolioPage}
              nextPortfolioPage={nextPortfolioPage}
            />
            <Experience cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} addItem={addItem} removeItem={removeItem} />
            <Education cvData={cvData} editMode={editMode} handleInputChange={handleInputChange} />
            <Blogs
              cvData={cvData}
              editMode={editMode}
              handleInputChange={handleInputChange}
              addItem={addItem}
              removeItem={removeItem}
              visibleBlogPosts={visibleBlogPosts}
              loadMoreBlogs={loadMoreBlogs}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
