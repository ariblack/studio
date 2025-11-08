import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarTrigger,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarInset,
  } from '@/components/ui/sidebar';
  import {
    Home,
    Users,
    Briefcase,
    Settings,
    Feather,
    LogOut,
  } from 'lucide-react';
  import Link from 'next/link';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { profile } from '@/lib/data';
  import { PlaceHolderImages } from '@/lib/placeholder-images';
  
  function getImageUrl(id: string) {
    return PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/admin" isActive={true} tooltip="Dashboard">
                        <Home />
                        Dashboard
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="Users">
                        <Users />
                        Users
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="Projects">
                        <Briefcase />
                        Projects
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="#" tooltip="Settings">
                        <Settings />
                        Settings
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
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
                    <SidebarMenuButton href="/" tooltip="Logout">
                        <LogOut />
                    </SidebarMenuButton>
                </SidebarFooter>
            </Sidebar>
          <SidebarInset>
            <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger />
                <h1 className="text-xl font-semibold">Dashboard</h1>
            </header>
            <main className="p-4">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }
  