"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUIStore, useAuthStore, useCartStore } from "@/store/useStore";
import { mockUser } from "@/lib/mock-data";
import {
  LayoutDashboard,
  Brain,
  FolderKanban,
  Store,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  X,
  Bell,
  Search,
  ShoppingCart,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/ai-center", label: "AI Control Center", icon: Brain },
  { href: "/app/projects", label: "Projects", icon: FolderKanban },
  { href: "/app/marketplace", label: "Marketplace", icon: Store },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, sidebarMobileOpen, setSidebarMobileOpen } = useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-border/50 z-50 flex flex-col transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-[72px]" : "w-[260px]",
          sidebarMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          <Link href="/app/dashboard" className="flex items-center gap-3 min-w-0">
            <Image src="/Logo.png" alt="Bunyan" width={36} height={36} className="rounded-lg flex-shrink-0" />
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="text-lg font-bold text-primary whitespace-nowrap overflow-hidden"
              >
                Bunyan
              </motion.span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-7 h-7 rounded-lg hover:bg-gray-100 items-center justify-center text-muted transition-colors"
          >
            <ChevronLeft size={16} className={cn("transition-transform", sidebarCollapsed && "rotate-180")} />
          </button>
          <button
            onClick={() => setSidebarMobileOpen(false)}
            className="lg:hidden p-1 text-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 h-10 px-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-secondary hover:text-primary hover:bg-gray-50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full"
                  />
                )}
                <item.icon size={20} className={cn("flex-shrink-0", isActive && "text-accent")} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-primary text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 p-2 rounded-xl bg-background">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                AR
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-primary truncate">{mockUser.full_name}</p>
                <p className="text-[10px] text-muted truncate">{mockUser.company_name}</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function TopNavbar() {
  const { sidebarCollapsed, setSidebarMobileOpen } = useUIStore();
  const { items: cartItems } = useCartStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-border/50 z-30 flex items-center justify-between px-6 transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-[260px]",
        "max-lg:left-0"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-muted transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 h-9 px-3 w-80 bg-background rounded-lg border border-border/50">
          <Search size={16} className="text-muted" />
          <input
            type="text"
            placeholder="Search projects, materials, analytics..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted/60 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Cart */}
        <Link
          href="/app/marketplace"
          className="relative p-2 rounded-lg hover:bg-gray-100 text-muted transition-colors"
        >
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Link>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 text-muted transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
              AR
            </div>
            <span className="hidden sm:block text-sm font-medium text-primary">{mockUser.full_name}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 top-12 w-56 bg-white border border-border/50 rounded-xl shadow-lg z-50 py-2"
                >
                  <div className="px-3 py-2 border-b border-border/50 mb-1">
                    <p className="text-sm font-medium text-primary">{mockUser.full_name}</p>
                    <p className="text-xs text-muted">{mockUser.email}</p>
                  </div>
                  <Link
                    href="/app/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50 transition-colors"
                  >
                    <User size={16} /> Profile Settings
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      router.push("/");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default function AppLayout({ children }) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopNavbar />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
