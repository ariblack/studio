'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AiReviewClient } from '@/components/ai-review-client';
import { ContactForm } from '@/components/contact-form';
import { profile } from '@/lib/data';
import type { Project } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';

const socialIcons = {
  github: <Github />,
  linkedin: <Linkedin />,
  twitter: <Twitter />,
};

function getImageUrl(id: string) {
  return PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
}

function getImageHint(id: string) {
    return PlaceHolderImages.find(img => img.id === id)?.imageHint || '';
}

export default function Home() {
  const { firestore, user } = useFirebase();

  const projectsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, 'users', user.uid, 'projects'));
  }, [firestore, user]);

  const { data: projects, isLoading } = useCollection<Project>(projectsQuery);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="py-24 sm:py-32 text-center container mx-auto">
          <Avatar className="mx-auto h-32 w-32 mb-6 ring-4 ring-primary ring-offset-4 ring-offset-background">
            <AvatarImage src={getImageUrl(profile.avatar)} alt={profile.name} data-ai-hint={getImageHint(profile.avatar)} />
            <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">{profile.name}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{profile.title}</p>
          <p className="max-w-3xl mx-auto text-foreground/80 mb-10">{profile.bio}</p>
          <div className="flex justify-center gap-4">
             <Button asChild size="lg">
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <div className="flex gap-2">
              {Object.entries(profile.socials).map(([key, url]) => (
                <Button key={key} variant="outline" size="icon" asChild>
                  <Link href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                    {socialIcons[key as keyof typeof socialIcons]}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Project Gallery Section */}
        <section id="projects" className="py-24 sm_py-32 bg-card">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-headline">My Work</h2>
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="overflow-hidden flex flex-col">
                    <div className="aspect-video bg-muted animate-pulse"></div>
                    <CardHeader>
                      <div className="h-6 bg-muted animate-pulse rounded-md w-3/4"></div>
                      <div className="h-4 bg-muted animate-pulse rounded-md w-full mt-2"></div>
                      <div className="h-4 bg-muted animate-pulse rounded-md w-1/2 mt-1"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                        <div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                       <div className="h-10 w-24 bg-muted animate-pulse rounded-md"></div>
                       <div className="h-10 w-24 bg-muted animate-pulse rounded-md"></div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {projects && projects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden relative">
                       <Image src={getImageUrl(project.image)} alt={project.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={getImageHint(project.image)} />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button asChild>
                        <Link href={project.liveUrl}>Live Demo</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href={project.githubUrl}>GitHub</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {!isLoading && (!projects || projects.length === 0) && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold">No projects yet!</h3>
                <p className="text-muted-foreground mt-2">Check back soon to see my latest work.</p>
              </div>
            )}
          </div>
        </section>

        {/* AI Review Section */}
        <section id="ai-review" className="py-24 sm:py-32">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">AI Portfolio Review</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              Paste a section of your portfolio (like a project description or your bio) to get AI-powered feedback on clarity, impact, and presentation.
            </p>
            <AiReviewClient />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 sm:py-32 bg-card">
           <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-headline">Get In Touch</h2>
            <p className="text-muted-foreground text-center mb-8">
              Have a question or want to work together? Send me a message.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
