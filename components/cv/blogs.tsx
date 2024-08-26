"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiExternalLink as ExternalLinkIcon, FiPlus as PlusIcon, FiTrash as TrashIcon } from "react-icons/fi";
import { CVData } from "@/lib/types";

interface BlogsProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
  removeItem: (section: keyof CVData, index: number) => void;
  addItem: (section: keyof CVData) => void;
}

export default function Blogs({ editMode, cvData, handleInputChange, removeItem, addItem }: BlogsProps) {
  if (!editMode && cvData.blogs.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Blog Posts</h2>
      <div className="space-y-3">
        {cvData.blogs.map((blog, index) => (
          <div key={index} className="border-b pb-2">
            {editMode ? (
              <>
                <Input value={blog.title} onChange={(e) => handleInputChange("blogs", index, "title", e.target.value)} className="text-sm font-semibold mb-1" />
                <Textarea value={blog.summary} onChange={(e) => handleInputChange("blogs", index, "summary", e.target.value)} className="text-xs mb-1" />
                <Input value={blog.url} onChange={(e) => handleInputChange("blogs", index, "url", e.target.value)} className="text-xs mb-1" />
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => removeItem("blogs", index)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-sm font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-xs text-gray-700 mb-1">{blog.summary}</p>
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center">
                  Read More
                  <ExternalLinkIcon className="h-3 w-3 ml-1" />
                </a>
              </>
            )}
          </div>
        ))}
        {editMode && (
          <Button size="sm" variant="outline" className="h-6 text-xs" onClick={() => addItem("blogs")}>
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Blog Post
          </Button>
        )}
      </div>
    </section>
  );
}
