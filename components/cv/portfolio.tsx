"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiExternalLink as ExternalLinkIcon, FiGithub as GithubIcon, FiPlus as PlusIcon, FiTrash as TrashIcon } from "react-icons/fi";
import { CVData } from "../../lib/types";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface PortfolioProps {
  cvData: CVData;
  editMode: boolean;
  handleInputChange: (section: keyof CVData, index: number | null, field: string | null, value: string | string[]) => void;
  removeItem: (section: keyof CVData, index: number) => void;
  addItem: (section: keyof CVData) => void;
  currentPortfolioPage: number;
  prevPortfolioPage: () => void;
  nextPortfolioPage: () => void;
}

export default function Portfolio({ editMode, cvData, handleInputChange, removeItem, addItem, currentPortfolioPage, prevPortfolioPage, nextPortfolioPage }: PortfolioProps) {
  if (!editMode && cvData.portfolio.length === 0) {
    return null;
  }

  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Portfolio</h2>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cvData.portfolio.slice(currentPortfolioPage * 4, (currentPortfolioPage + 1) * 4).map((project, index) => (
            <div key={index} className="group">
              {editMode ? (
                <Card className="overflow-hidden">
                  <CardContent className="p-3">
                    <Input
                      value={project.title}
                      onChange={(e) => handleInputChange("portfolio", currentPortfolioPage * 4 + index, "title", e.target.value)}
                      className="text-sm font-semibold mb-1"
                      placeholder="Project Title"
                      aria-label={`Project ${currentPortfolioPage * 4 + index + 1} Title`}
                    />
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleInputChange("portfolio", currentPortfolioPage * 4 + index, "description", e.target.value)}
                      className="text-xs mb-2"
                      placeholder="Project Description"
                      aria-label={`Project ${currentPortfolioPage * 4 + index + 1} Description`}
                    />
                    <Input
                      value={project.tech.join(", ")}
                      onChange={(e) => handleInputChange("portfolio", currentPortfolioPage * 4 + index, "tech", e.target.value.split(", "))}
                      className="text-xs mb-2"
                      placeholder="Technologies (comma-separated)"
                      aria-label={`Project ${currentPortfolioPage * 4 + index + 1} Technologies`}
                    />
                    <Input
                      value={project.liveUrl}
                      onChange={(e) => handleInputChange("portfolio", currentPortfolioPage * 4 + index, "liveUrl", e.target.value)}
                      className="text-xs mb-1"
                      placeholder="Live URL"
                      aria-label={`Project ${currentPortfolioPage * 4 + index + 1} Live URL`}
                    />
                    <Input
                      value={project.githubUrl}
                      onChange={(e) => handleInputChange("portfolio", currentPortfolioPage * 4 + index, "githubUrl", e.target.value)}
                      className="text-xs mb-1"
                      placeholder="GitHub URL"
                      aria-label={`Project ${currentPortfolioPage * 4 + index + 1} GitHub URL`}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => removeItem("portfolio", currentPortfolioPage * 4 + index)}
                      aria-label={`Remove Project ${currentPortfolioPage * 4 + index + 1}`}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="bg-white p-3 rounded-lg transition-all duration-300 ease-in-out hover:shadow-sm shadow-lg">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2 group-hover:line-clamp-none">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-[10px] px-1 py-0 bg-gray-100">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="ghost" className="h-6 text-xs p-0" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-3 w-3 mr-1" />
                        Live
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 text-xs p-0" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="h-3 w-3 mr-1" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {!editMode && cvData.portfolio.length > 4 && (
          <div className="flex justify-between mt-4">
            <Button size="sm" variant="outline" onClick={prevPortfolioPage} aria-label="Previous projects">
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button size="sm" variant="outline" onClick={nextPortfolioPage} aria-label="Next projects">
              Next
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
      {editMode && (
        <div className="mt-4 text-center">
          <Button size="sm" variant="outline" onClick={() => addItem("portfolio")}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      )}
    </section>
  );
}
