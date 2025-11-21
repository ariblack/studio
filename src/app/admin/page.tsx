'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { DollarSign, Users, Briefcase, Activity, PlusCircle, MoreHorizontal, Trash2, Edit } from "lucide-react";
import type { Project } from '@/lib/data';
import { EditProjectDialog } from '@/components/edit-project-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { projects as initialProjects } from '@/lib/data';
import Link from 'next/link';

const stats = [
    { title: "Total Revenue", value: "$45,231.89", icon: <DollarSign className="h-4 w-4 text-muted-foreground" />, change: "+20.1% from last month" },
    { title: "Active Users", value: "+2350", icon: <Users className="h-4 w-4 text-muted-foreground" />, change: "+180.1% from last month" },
    { title: "Projects", value: "+12", icon: <Briefcase className="h-4 w-4 text-muted-foreground" />, change: "+19% from last month" },
    { title: "Reviews", value: "+573", icon: <Activity className="h-4 w-4 text-muted-foreground" />, change: "+201 since last hour" },
];

export default function AdminPage() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const isLoading = false;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleAddProject = () => {
        setSelectedProject(null);
        setIsDialogOpen(true);
    };

    const handleEditProject = (project: Project) => {
        setSelectedProject(project);
        setIsDialogOpen(true);
    };
    
    const handleDeleteProject = (project: Project) => {
        setSelectedProject(project);
        setIsDeleteDialogOpen(true);
    }

    const handleSaveProject = (projectToSave: Project) => {
        if (selectedProject) {
            setProjects(projects.map(p => p.id === projectToSave.id ? projectToSave : p));
        } else {
            setProjects([...projects, { ...projectToSave, id: `proj-${Date.now()}` }]);
        }
        setIsDialogOpen(false);
        setSelectedProject(null);
    };

    const confirmDelete = () => {
        if (!selectedProject) return;
        setProjects(projects.filter(p => p.id !== selectedProject.id));
        setIsDeleteDialogOpen(false);
        setSelectedProject(null);
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </header>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Projects</CardTitle>
                        <CardDescription>A list of your most recent projects. <Link href="/admin/projects" className="text-primary hover:underline">View all</Link>.</CardDescription>
                    </div>
                    <Button size="sm" onClick={handleAddProject}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Project
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead className="hidden md:table-cell">Tags</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Loading projects...</TableCell>
                                </TableRow>
                            )}
                            {projects && projects.slice(0, 5).map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="font-medium">{project.title}</div>
                                        <div className="text-sm text-muted-foreground hidden md:inline">{project.description.substring(0, 50)}...</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex flex-wrap gap-1">
                                            {project.tags.map(tag => (
                                                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Live</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onSelect={() => handleEditProject(project)}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleDeleteProject(project)} className="text-destructive focus:text-destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!isLoading && (!projects || projects.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No projects found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <EditProjectDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                project={selectedProject}
                onSave={handleSaveProject}
            />
            
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            project from your portfolio.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}
