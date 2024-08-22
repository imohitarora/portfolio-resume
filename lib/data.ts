import { CVData } from './types';

export const initialCVData: CVData = {
    name: "Jane Doe",
    title: "Full Stack Developer",
    summary:
        "Passionate full stack developer with 5 years of experience building scalable web applications. Proficient in JavaScript, React, Node.js, and Python. Strong problem-solving skills and a keen eye for user experience.",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Docker"],
    portfolio: [
        {
            title: "E-commerce Platform",
            description: "Full-featured online store with user authentication, product management, and payment integration.",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            liveUrl: "https://ecommerce-example.com",
            githubUrl: "https://github.com/janedoe/ecommerce-platform",
        },
        {
            title: "Task Management App",
            description: "Kanban-style task management app with real-time updates and team collaboration features.",
            tech: ["Vue.js", "Firebase", "Tailwind CSS"],
            liveUrl: "https://taskapp-example.com",
            githubUrl: "https://github.com/janedoe/task-management-app",
        },
        {
            title: "Weather Dashboard",
            description: "Responsive weather dashboard providing real-time data and forecasts for multiple locations.",
            tech: ["React", "OpenWeatherMap API", "Chart.js"],
            liveUrl: "https://weather-example.com",
            githubUrl: "https://github.com/janedoe/weather-dashboard",
        },
    ],
    experience: [
        {
            title: "Senior Developer",
            company: "Tech Corp",
            period: "2020 - Present",
            responsibilities: [
                "Led development of a high-traffic e-commerce platform",
                "Implemented CI/CD pipelines, reducing deployment time by 50%",
                "Mentored junior developers and conducted code reviews",
            ],
        },
        {
            title: "Full Stack Developer",
            company: "StartUp Inc",
            period: "2018 - 2020",
            responsibilities: [
                "Developed and maintained multiple client-facing web applications",
                "Optimized database queries, improving application performance by 30%",
                "Collaborated with UX designers to implement responsive designs",
            ],
        },
    ],
    education: {
        degree: "BSc in Computer Science",
        school: "University of Technology",
        period: "2014 - 2018",
    },
    blogs: [
        {
            title: "Mastering React Hooks",
            summary: "A deep dive into React's useState and useEffect hooks.",
            url: "https://blog.example.com/react-hooks",
        },
        {
            title: "Building Scalable Node.js Applications",
            summary: "Best practices for creating large-scale Node.js apps.",
            url: "https://blog.example.com/scalable-nodejs",
        },
    ],
}