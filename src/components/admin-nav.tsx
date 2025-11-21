'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Users, Briefcase, Settings } from 'lucide-react';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: <Home /> },
  { href: '/admin/projects', label: 'Projects', icon: <Briefcase /> },
  { href: '/admin/users', label: 'Users', icon: <Users /> },
  { href: '/admin/settings', label: 'Settings', icon: <Settings /> },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            href={link.href}
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            {link.icon}
            {link.label}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
