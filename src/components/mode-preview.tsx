"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { UserRound, Target, ChevronRight, Newspaper, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModePreview() {
    const [hovered, setHovered] = useState<"manager" | "pro" | null>(null);

    return (
        <section id="pro" className="h-[90vh] min-h-[700px] bg-[#0B0E14] relative flex flex-col md:flex-row overflow-hidden group">
            {/* Manager Section */}
            <div
                onMouseEnter={() => setHovered("manager")}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                    "relative flex-1 flex flex-col items-center justify-center p-12 transition-all duration-1000 cursor-pointer overflow-hidden border-r border-white/5",
                    hovered === "pro" ? "flex-[0.4] grayscale opacity-20" : "flex-1"
                )}
            >
                <BlurFade delay={0.2} inView>
                    <div className="z-10 text-center space-y-8">
                        <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#D4AF37]/50 transition-all duration-700 group-hover:rotate-6">
                            <UserRound className="w-12 h-12 text-[#D4AF37]" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-[-0.05em] leading-none">
                            The <span className="text-[#D4AF37]">Manager</span>
                        </h2>
                        <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">Build Your FC Dynasty</p>
                    </div>
                </BlurFade>

                <AnimatePresence>
                    {hovered === "manager" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 z-20 flex items-center justify-center p-12 bg-[#D4AF37]/5 backdrop-blur-3xl"
                        >
                            <div className="space-y-6 max-w-sm w-full">
                                <div className="p-6 rounded-[2rem] bg-black/80 border border-[#D4AF37]/20 shadow-2xl space-y-4 transform hover:-translate-y-2 transition-transform">
                                    <div className="flex items-center gap-3">
                                        <Newspaper className="w-4 h-4 text-[#D4AF37]" />
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">FC 25 Neural Scout Feed</span>
                                    </div>
                                    <p className="text-lg font-heading font-black text-white leading-tight uppercase">
                                        "AI reveals 18yo Wonderkid in Division 2"
                                    </p>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-black/80 border border-[#D4AF37]/20 shadow-2xl space-y-4 ml-12 transform hover:-translate-y-2 transition-transform">
                                    <p className="text-lg font-heading font-black text-white leading-tight uppercase">
                                        "Board confidence: 99.4%"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Pro Section */}
            <div
                onMouseEnter={() => setHovered("pro")}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                    "relative flex-1 flex flex-col items-center justify-center p-12 transition-all duration-1000 cursor-pointer overflow-hidden",
                    hovered === "manager" ? "flex-[0.4] grayscale opacity-20" : "flex-1"
                )}
            >
                <BlurFade delay={0.3} inView>
                    <div className="z-10 text-center space-y-8">
                        <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mx-auto border border-white/10 group-hover:border-[#00FF41]/50 transition-all duration-700 group-hover:-rotate-6">
                            <Target className="w-12 h-12 text-[#00FF41]" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-[-0.05em] leading-none">
                            The <span className="text-[#00FF41]">Elite</span>
                        </h2>
                        <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">Dominate The FC 25 Pitch</p>
                    </div>
                </BlurFade>

                <AnimatePresence>
                    {hovered === "pro" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 z-20 flex items-center justify-center p-12 bg-[#00FF41]/5 backdrop-blur-3xl"
                        >
                            <div className="space-y-6 max-w-sm w-full">
                                <div className="p-6 rounded-[2rem] bg-black/80 border border-[#00FF41]/20 shadow-2xl space-y-4 transform hover:-translate-y-2 transition-transform">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-4 h-4 text-[#00FF41]" />
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">SBC Resolution</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-heading font-black text-white uppercase">SBC Solved</span>
                                        <span className="text-sm font-mono text-[#00FF41]">12.4K</span>
                                    </div>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-black/80 border border-[#00FF41]/20 shadow-2xl space-y-4 -ml-12 transform hover:-translate-y-2 transition-transform">
                                    <p className="text-lg font-heading font-black text-white leading-tight uppercase">
                                        "4-3-2-1 Neural Meta Synced"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none hidden md:block">
                <div className="w-16 h-16 rounded-full bg-[#0B0E14] border border-white/10 flex items-center justify-center shadow-2xl transition-all duration-700"
                    style={{ transform: hovered === "manager" ? "translateX(-15px)" : hovered === "pro" ? "translateX(15px)" : "none" }}>
                    <ChevronRight className={cn("w-8 h-8 text-white transition-transform duration-700", hovered === "manager" ? "rotate-180" : "rotate-0")} />
                </div>
            </div>
        </section>
    );
}
