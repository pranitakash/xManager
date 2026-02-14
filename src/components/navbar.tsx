"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NavbarPopup } from "./navbar-popup";
import { AnimatePresence } from "framer-motion";

import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <ScrollProgress className="top-0 h-1 bg-gradient-to-r from-[#00FF41] to-[#D4AF37] z-[60]" />
            <div className="fixed top-6 left-0 right-0 z-50 px-8 pointer-events-none">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto"
                >
                    {/* Logo Capsule */}
                    <div className="flex-1 flex justify-start">
                        <div className="bg-black/20 dark:bg-[#0B0E14]/40 backdrop-blur-2xl border border-black/5 dark:border-white/5 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl">
                            <a href="/" className="flex items-center gap-2">
                                <img src="/xManager_Logo.png" alt="FC xManager Logo" className="w-8 h-8 object-contain" />
                                <span className="text-[14px] font-heading font-black tracking-[-0.05em] text-foreground uppercase italic">
                                    FC <span className="lowercase">x</span><span className="text-[#00FF41]">M</span><span className="hidden lg:inline text-foreground/40">anager</span>
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Capsule */}
                    <div className="flex-none hidden md:flex">
                        <div className="bg-black/20 dark:bg-[#0B0E14]/40 backdrop-blur-2xl border border-black/5 dark:border-white/5 px-6 py-2 rounded-2xl flex items-center gap-8 shadow-2xl">
                            {['Tactics', 'Clubhouse', 'Pitch Notes', 'Elite'].map((item) => (
                                <div
                                    key={item}
                                    className="relative py-1"
                                    onMouseEnter={() => setHoveredItem(item)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <a
                                        href={item === "Elite" ? "#pro" : `#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-[9px] font-black tracking-[0.2em] text-muted-foreground uppercase hover:text-[#00FF41] transition-colors"
                                    >
                                        {item}
                                    </a>
                                    <NavbarPopup item={item} isOpen={hoveredItem === item} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Auth & Theme Capsule */}
                    <div className="flex-1 flex justify-end gap-4">
                        <div className="bg-black/20 dark:bg-[#0B0E14]/40 backdrop-blur-2xl border border-black/5 dark:border-white/5 px-4 py-1.5 rounded-2xl flex items-center gap-4 shadow-2xl">
                            <a href="/auth" className="text-[10px] font-black uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors">Login</a>
                            <ShimmerButton
                                className="h-8 px-4 text-[9px] font-black uppercase tracking-tighter text-primary-foreground"
                                background="var(--primary)"
                                shimmerColor="#ffffff"
                            >
                                Access
                            </ShimmerButton>
                        </div>
                        <ThemeToggle />
                    </div>
                </motion.nav>
            </div>
        </>
    );
}
