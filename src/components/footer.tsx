import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { profile } from '@/lib/data';

const socialIcons = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {currentYear} {profile.name}. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          {Object.entries(profile.socials).map(([key, url]) => (
            <Link key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label={key}>
              {socialIcons[key as keyof typeof socialIcons]}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
