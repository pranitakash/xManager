"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Search, Cpu, Dna, Settings, Camera, Plus, Play, ArrowRight, ArrowUpRight } from "lucide-react";
import { Football3D } from "./football-3d";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

const features = [
    {
        icon: TrendingUp,
        name: "Investment Whale",
        description: "Track big-money market moves in real-time to flip cards like a pro.",
        color: "#00FF41",
        href: "/investment-whale",
    },
    {
        icon: Search,
        name: "Transfer Scout",
        description: "Find budget-friendly clones of the most expensive meta players.",
        color: "#00FF41",
        href: "/transfer-scout",
    },
    {
        icon: Cpu,
        name: "SBC Solutionist",
        description: "Get instant, cheapest-possible solutions using your club players.",
        color: "#00FF41",
        href: "/sbc-solutionist",
    },
    {
        icon: Dna,
        name: "Evo-Path Optimizer",
        description: "Map out every possible upgrade path and max your favorite cards.",
        color: "#00FF41",
        href: "/evo-path-optimizer",
    },
    {
        icon: Settings,
        name: "Tactics Simulator",
        description: "Get custom tactical sliders tailored to your squad's PlayStyles.",
        color: "#00FF41",
        href: "/tactics-simulator",
    },
    {
        icon: Camera,
        name: "Post-Match Reviewer",
        description: "Identify exactly where you lost control with automated match scans.",
        color: "#00FF41",
        href: "/post-match-reviewer",
    },
];

export function SelectionWheel() {
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
                    animation: wheel-spin 40s linear infinite;
                }
                .wheel-item {
                    animation: item-counter-spin 40s linear infinite;
                }
            `}</style>

            {/* Central Football */}
            <div className="z-20">
                <Football3D />
            </div>

            {/* Steady Rotating Container */}
            <div className="absolute inset-0 z-30 flex items-center justify-center wheel-container">
                {/* Feature Items */}
                {features.map((feature, index) => {
                    const angle = (index * 360) / features.length;
                    const radius = 210;
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
                                    isHovered ? "w-64" : "w-16 h-16"
                                )}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Feature Icon/Indicator in static mode */}
                                <div className={cn(
                                    "w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-[#0B0E14] backdrop-blur-xl transition-all duration-500",
                                    isHovered ? "bg-[#00FF41] border-[#00FF41] text-[#0B0E14]" : "text-white hover:border-[#00FF41]/50"
                                )}>
                                    <feature.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                </div>

                                {/* Feature Name (Static Mode) */}
                                {!isHovered && (
                                    <span className="absolute top-14 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
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
                                            className="absolute top-1/2 left-1/2 w-64 p-6 rounded-3xl bg-[#0B0E14]/95 border border-[#00FF41]/20 backdrop-blur-3xl text-center shadow-[0_0_50px_rgba(0,255,65,0.15)] z-50 pointer-events-auto overflow-hidden"
                                        >
                                            <BorderBeam size={100} duration={4} colorFrom="#00FF41" colorTo="#0084ff" />


                                            <div className="w-16 h-16 rounded-full bg-[#00FF41] text-[#0B0E14] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,65,0.4)] relative z-10 transition-transform duration-500 hover:scale-110">
                                                <feature.icon className="w-8 h-8" />
                                            </div>
                                            <div className="space-y-3 relative z-10">
                                                <h3 className="text-xl font-heading font-black text-white uppercase tracking-tighter lg:text-3xl">
                                                    {feature.name}
                                                </h3>
                                                <p className="text-sm text-gray-400 font-medium leading-relaxed px-4 md:text-base opacity-80">
                                                    {feature.description}
                                                </p>
                                            </div>

                                            {/* Pure Minimalist Clickable Arrow */}
                                            <Link
                                                href={feature.href}
                                                className="absolute bottom-6 right-6 z-20 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 cursor-pointer"
                                            >
                                                <ArrowUpRight className="w-6 h-6 text-white/20 group-hover:text-[#00FF41] hover:scale-110 active:scale-95 transition-all" />
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Background Decorative Rings for the wheel */}
            <div className="absolute w-[420px] h-[420px] border border-white/5 rounded-full" />
            <div className="absolute w-[422px] h-[422px] border border-white/5 rounded-full opacity-50" />
        </div>
    );
}
