"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Sparkles,
    ShieldCheck,
    PenTool,
    PieChart,
    Brain,
    Globe,
    ArrowUpRight,
    Play
} from "lucide-react";
import { BoardroomAvatar } from "./boardroom-avatar";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

const features = [
    {
        icon: Sparkles,
        name: "Wonderkid Whisperer",
        description: "Detect hidden gems and high-growth prospects before they hit the global radar.",
        color: "var(--primary)",
        href: "/boardroom/wonderkids",
    },
    {
        icon: ShieldCheck,
        name: "Realism Enforcer",
        description: "Apply algorithmic constraints to ensure your transfers stay grounded in reality.",
        color: "var(--primary)",
        href: "/boardroom/realism",
    },
    {
        icon: PenTool,
        name: "Storyline Generator",
        description: "Create dynamic narrative arcs and press scenarios to deepen your club's lore.",
        color: "var(--primary)",
        href: "/boardroom/storylines",
    },
    {
        icon: PieChart,
        name: "Financial Auditor",
        description: "Track club revenue, transfer profit, and wage-to-turnover ratios in real-time.",
        color: "var(--primary)",
        href: "/boardroom/finance",
    },
    {
        icon: Brain,
        name: "Manager Persona AI",
        description: "Develop a unique coaching identity that influences morale and negotiation tactics.",
        color: "var(--primary)",
        href: "/boardroom/persona",
    },
    {
        icon: Globe,
        name: "Sister Club Scout",
        description: "Manage a global network of affiliates to loan talent and monitor development.",
        color: "var(--primary)",
        href: "/boardroom/sister-clubs",
    },
];

export function BoardroomWheel() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            {/* Custom Styles for sync rotation */}
            <style jsx global>{`
                @keyframes wheel-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes item-counter-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                .wheel-container {
                    animation: wheel-spin 50s linear infinite;
                }
                .wheel-item {
                    animation: item-counter-spin 50s linear infinite;
                }
            `}</style>

            {/* Central Avatar */}
            <div className="z-20">
                <BoardroomAvatar />
            </div>

            {/* Steady Rotating Container */}
            <div className="absolute inset-0 z-30 flex items-center justify-center wheel-container">
                {/* Feature Items */}
                {features.map((feature, index) => {
                    const angle = (index * 360) / features.length;
                    const radius = 230; // Slightly larger radius for the manager image
                    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                    const isHovered = hoveredIndex === index;

                    return (
                        <div
                            key={feature.name}
                            className="absolute flex items-center justify-center"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {/* Counter-rotate to keep content upright */}
                            <div
                                className={cn(
                                    "relative flex flex-col items-center justify-center transition-all duration-500 wheel-item",
                                    isHovered ? "w-72" : "w-16 h-16"
                                )}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Feature Icon/Indicator in static mode */}
                                <div className={cn(
                                    "w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center bg-background backdrop-blur-xl transition-all duration-500",
                                    isHovered ? "bg-secondary border-secondary text-secondary-foreground" : "text-foreground hover:border-secondary/50 shadow-2xl"
                                )}>
                                    <feature.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                </div>

                                {/* Feature Name (Static Mode) */}
                                {!isHovered && (
                                    <span className="absolute top-14 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                        {feature.name}
                                    </span>
                                )}

                                {/* Expanded Content (Hover Mode) */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                                            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                                            className="absolute top-1/2 left-1/2 w-72 p-8 rounded-[2.5rem] bg-background/95 border border-secondary/20 backdrop-blur-3xl text-center shadow-[0_0_50px_rgba(234,179,8,0.1)] z-50 pointer-events-auto overflow-hidden transition-colors duration-500"
                                        >
                                            <BorderBeam size={120} duration={6} colorFrom="#EAB308" colorTo="#FFFFFF" />

                                            <div className="w-16 h-16 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(234,179,8,0.4)] relative z-10">
                                                <feature.icon className="w-8 h-8" />
                                            </div>

                                            <div className="space-y-4 relative z-10">
                                                <h3 className="text-xl font-heading font-black text-foreground uppercase tracking-tighter lg:text-3xl leading-tight">
                                                    {feature.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground font-medium leading-relaxed px-4 md:text-base opacity-90">
                                                    {feature.description}
                                                </p>
                                            </div>

                                            {/* Pure Minimalist Clickable Arrow */}
                                            <Link
                                                href={feature.href}
                                                className="absolute bottom-6 right-6 z-20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 cursor-pointer"
                                            >
                                                <ArrowUpRight className="w-6 h-6 text-foreground/20 group-hover:text-secondary hover:scale-110 active:scale-95 transition-all" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Background Decorative Rings */}
            <div className="absolute w-[460px] h-[460px] border border-foreground/5 rounded-full" />
            <div className="absolute w-[462px] h-[462px] border border-foreground/5 rounded-full opacity-50" />
        </div>
    );
}
