'use client';

import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarFooter,
    SidebarInset,
  } from '@/components/ui/sidebar';
  import {
    Feather,
    LogOut,
  } from 'lucide-react';
  import Link from 'next/link';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { profile } from '@/lib/data';
  import { PlaceHolderImages } from '@/lib/placeholder-images';
  import { AdminNav } from '@/components/admin-nav';
  
  function getImageUrl(id: string) {
    const image = PlaceHolderImages.find(img => img.id === id);
    return image ? image.imageUrl : '';
  }
  
  export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
            <Sidebar>
                <SidebarContent>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <Feather className="w-6 h-6 text-primary" />
                        <span className="text-lg font-semibold">Admin Panel</span>
                    </div>
                </SidebarHeader>
                <AdminNav />
                </SidebarContent>
                <SidebarFooter>
                    <div className='flex items-center gap-3'>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={getImageUrl(profile.avatar)} alt={profile.name} />
                            <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">{profile.name}</span>
                            <span className="text-xs text-muted-foreground">{profile.title.split('&')[0]}</span>
                        </div>
                    </div>
                    <SidebarMenu>
                      <Link href="/" className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground'>
                        <LogOut />
                        <span>Logout</span>
                      </Link>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
          <SidebarInset>
            <main className="p-4">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }