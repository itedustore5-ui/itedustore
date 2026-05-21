import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, LayoutDashboard, LogOut, Shield, Trophy, Menu, X } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";

export function QuizNav() {
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setLocation("/");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/quiz", label: "Kviz", icon: BookOpen },
    { href: "/scoreboard", label: "Scoreboard", icon: Trophy },
    ...(user?.isAdmin ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-x-0 border-t-0 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary shrink-0" />
            <span className="font-bold tracking-tight hidden sm:block text-white text-sm">MATURSKI KVIZ / Elektrotehničar računara</span>
            <span className="font-bold tracking-tight sm:hidden text-white text-sm">MATURSKI KVIZ</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-white hidden sm:block">{user?.name}</span>

            {/* Desktop logout */}
            <button
              onClick={handleLogout}
              className="hidden md:flex text-muted-foreground hover:text-white transition-colors p-2"
              title="Odjava"
            >
              <LogOut className="h-5 w-5" />
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Meni"
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  {label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2">
                <div className="px-4 py-2 text-xs text-muted-foreground">{user?.name} · {user?.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-colors font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  Odjava
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
