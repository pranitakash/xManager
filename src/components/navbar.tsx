"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NavbarPopup } from "./navbar-popup";
import { AnimatePresence } from "framer-motion";

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
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
                    scrolled
                        ? "bg-[#0B0E14]/70 backdrop-blur-2xl border-b border-white/5 py-3"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center gap-3 group">
                        <img src="/xManager_Logo.png" alt="FC xManager Logo" className="w-20 h-20 object-contain" />
                        <span className="text-2xl font-heading font-black tracking-[-0.05em] text-white uppercase italic">
                            FC <span className="lowercase">x</span><span className="text-[#00FF41]">Manager</span>
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-10 text-[11px] font-black tracking-[0.2em] text-gray-400 uppercase">
                        {['Tactics', 'Clubhouse', 'Pitch Notes', 'Elite'].map((item) => (
                            <div
                                key={item}
                                className="relative py-2"
                                onMouseEnter={() => setHoveredItem(item)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <a
                                    href={item === "Elite" ? "#pro" : `#${item.toLowerCase().replace(' ', '-')}`}
                                    className="hover:text-[#00FF41] transition-colors"
                                >
                                    {item}
                                </a>
                                <NavbarPopup item={item} isOpen={hoveredItem === item} />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="/auth" className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors">Login</a>
                        <ShimmerButton
                            className="h-10 px-6 text-xs font-black uppercase tracking-tighter text-[#0B0E14]"
                            background="#00FF41"
                            shimmerColor="#ffffff"
                        >
                            Get Access
                        </ShimmerButton>
                    </div>
                </div>
            </motion.nav>
        </>
    );
}
