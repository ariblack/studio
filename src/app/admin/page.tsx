'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Briefcase, Activity } from "lucide-react";
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Project } from '@/lib/data';

const stats = [
    { title: "Total Revenue", value: "$45,231.89", icon: <DollarSign className="h-4 w-4 text-muted-foreground" />, change: "+20.1% from last month" },
    { title: "Active Users", value: "+2350", icon: <Users className="h-4 w-4 text-muted-foreground" />, change: "+180.1% from last month" },
    { title: "Projects", value: "+12", icon: <Briefcase className="h-4 w-4 text-muted-foreground" />, change: "+19% from last month" },
    { title: "Reviews", value: "+573", icon: <Activity className="h-4 w-4 text-muted-foreground" />, change: "+201 since last hour" },
];

export default function AdminPage() {
    const { firestore, user } = useFirebase();

    const projectsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, 'users', user.uid, 'projects'));
    }, [firestore, user]);

    const { data: projects, isLoading } = useCollection<Project>(projectsQuery);

    return (
        <div className="space-y-8">
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
                <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>A list of the most recently added projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Project</TableHead>
                                <TableHead className="hidden md:table-cell">Tags</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Loading projects...</TableCell>
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
                                </TableRow>
                            ))}
                            {!isLoading && (!projects || projects.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">No projects found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
