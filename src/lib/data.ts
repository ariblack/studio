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
