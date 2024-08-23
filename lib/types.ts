export interface Project {
    title: string;
    description: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
}

export interface Experience {
    title: string;
    company: string;
    period: string;
    responsibilities: string[];
}

export interface Education {
    degree: string;
    school: string;
    period: string;
}

export interface BlogPost {
    title: string;
    summary: string;
    url: string;
}

export interface Socials {
    github: string;
    linkedin: string;
    email: string;
    twitter: string;
    resume: string;
}

export interface CVData {
    name: string;
    title: string;
    summary: string;
    skills: string[];
    links: Socials;
    portfolio: Project[];
    experience: Experience[];
    education: Education[];
    blogs: BlogPost[];
}