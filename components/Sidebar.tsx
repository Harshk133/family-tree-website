"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, UserPlus, Settings, Network } from "lucide-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Tree View", href: "/tree-view", icon: Network },
  { name: "Add Member", href: "/add-member", icon: UserPlus },
  { name: "Profiles", href: "/profiles", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 shadow-sm hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <Network className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">FamilyTree</h1>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={twMerge(
                  clsx(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm",
                    isActive 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )
                )}
              >
                <Icon size={18} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-indigo-50 p-4 rounded-xl text-center">
            <h3 className="text-xs font-bold text-indigo-800 mb-1">Student Project</h3>
            <p className="text-[10px] text-indigo-600">Built with React & Next.js</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <Network className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">FamilyTree</h1>
        </div>
        
        <div className="h-full overflow-y-auto w-full relative">
          {children}
        </div>
      </main>
    </div>
  );
}
