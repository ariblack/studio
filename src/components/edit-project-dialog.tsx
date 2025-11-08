'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Project } from '@/lib/data';
import { useEffect, useState } from 'react';

interface EditProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const emptyProject: Omit<Project, 'id'> = {
  title: '',
  description: '',
  image: '',
  tags: [],
  liveUrl: '',
  githubUrl: '',
};

export function EditProjectDialog({
  project,
  isOpen,
  onClose,
  onSave,
}: EditProjectDialogProps) {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>(
    project || emptyProject
  );

  useEffect(() => {
    setFormData(project || emptyProject);
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData(prev => ({ ...prev, tags: value.split(',').map(t => t.trim()) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    const finalProject = {
      ...formData,
      id: project?.id || new Date().toISOString(),
    };
    onSave(finalProject);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{project ? 'Edit Project' : 'Add Project'}</DialogTitle>
          <DialogDescription>
            {project
              ? "Update the details of your project."
              : "Add a new project to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags
            </Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={handleChange}
              className="col-span-3"
              placeholder="React, Next.js, ..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="liveUrl" className="text-right">
              Live URL
            </Label>
            <Input
              id="liveUrl"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="githubUrl" className="text-right">
              GitHub URL
            </Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
