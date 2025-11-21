export type Project = {
  id: string;
  title: string;
  description: string;
  image: string; // Corresponds to id in placeholder-images.json
  tags: string[];
  liveUrl: string;
  githubUrl: string;
};

export const profile = {
  name: "Alex Doe",
  title: "Creative Developer & UI/UX Designer",
  bio: "I build beautiful, interactive, and accessible web experiences. With a passion for both design and technology, I turn complex problems into elegant digital solutions.",
  avatar: "profile-picture",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};

export const projects: Project[] = [
    {
        id: 'proj-1',
        title: 'E-commerce Platform',
        description: 'A full-featured e-commerce site with a custom CMS and a mobile-first responsive design.',
        image: 'project-1',
        tags: ['Next.js', 'Tailwind CSS', 'Stripe'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'proj-2',
        title: 'Data Visualization Dashboard',
        description: 'An analytics dashboard for visualizing complex data sets with interactive charts and filters.',
        image: 'project-2',
        tags: ['React', 'D3.js', 'Node.js'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'proj-3',
        title: 'SaaS Landing Page',
        description: 'A high-converting landing page for a SaaS product, focusing on performance and SEO.',
        image: 'project-3',
        tags: ['Gatsby', 'GraphQL', 'Framer Motion'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'proj-4',
        title: 'Mobile Banking App',
        description: 'A concept for a mobile banking application with a focus on user experience and security.',
        image: 'project-4',
        tags: ['Figma', 'UI/UX Design'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'proj-5',
        title: 'AI Chatbot Interface',
        description: 'Designed and built a conversational UI for an AI-powered customer service chatbot.',
        image: 'project-5',
        tags: ['GenAI', 'React', 'TypeScript'],
        liveUrl: '#',
        githubUrl: '#',
    },
    {
        id: 'proj-6',
        title: 'Personal Blog',
        description: 'A minimal, content-focused blog built with a static site generator for speed and simplicity.',
        image: 'project-6',
        tags: ['Astro', 'Markdown', 'Tailwind CSS'],
        liveUrl: '#',
        githubUrl: '#',
    },
];
