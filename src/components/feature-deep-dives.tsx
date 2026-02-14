"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { TrendingUp, Zap, Search, LineChart, ChevronRight, Cpu, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const deepDives = [
    {
        title: "Investment Whale",
        subtitle: "Master the Market",
        description: "Stop guessing and start winning. Investment Whale tracks big-money market moves in real-time across all FC 25 regions, so you can identify the signatures of the elite and flip cards like a professional trader without the stress.",
        Icon: TrendingUp,
        accent: "#00FF41",
        features: ["Live Market Pulse", "Whale Move Tracking", "Rapid Flipping Playbook"],
        stat: "Market Pulse",
        value: "+94.2%",
        Graphic: () => (
            <div className="w-full h-full flex items-end gap-2 px-8 py-12">
                {[40, 70, 45, 90, 65, 80, 50, 95, 85, 60].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1.5, delay: i * 0.05 + 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 rounded-t-xl bg-gradient-to-t from-transparent via-[#00FF41]/10 to-[#00FF41]/30"
                    />
                ))}
            </div>
        )
    },
    {
        title: "SBC Solutionist",
        subtitle: "End the Chemistry Grind",
        description: "The fastest way to 33 chemistry. Our SBC Solutionist scans your club's bench and reserves to find instant, cheapest-possible solutions using the players you already own, keeping your coins in your pocket.",
        Icon: Cpu,
        accent: "#00FF41",
        features: ["Club-First Logic", "Chemistry Maximizer", "Market Spend Minifier"],
        stat: "Chemistry Match",
        value: "33/33",
        Graphic: () => (
            <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-4 p-12">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.05 + 0.5 }}
                        className="relative rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-[#00FF41]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-2 h-2 rounded-full bg-[#00FF41]/40" />
                        {i % 3 === 0 && (
                            <motion.div
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 border border-[#00FF41]/30 rounded-xl"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        )
    },
    {
        title: "Storyline Generator",
        subtitle: "Build Your Legacy",
        description: "Turn your match results into a movie. Storyline Generator brings the drama of the locker room and the press room to your career save, evolving with every win, loss, and tactical masterclass.",
        Icon: BookOpen,
        accent: "#D4AF37",
        features: ["Locker Room Drama", "News Cycle Synthesis", "Living Legend Tracker"],
        stat: "Story Depth",
        value: "Active",
        Graphic: () => (
            <div className="w-full h-full flex flex-col gap-6 p-12">
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 + 0.5 }}
                        className="flex items-center gap-6"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-black text-xs">
                            0{i}
                        </div>
                        <div className="flex-1 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center px-6">
                            <div className={`h-2 rounded-full bg-[#D4AF37]/30`} style={{ width: `${i * 30}%` }} />
                        </div>
                    </motion.div>
                ))}
                <div className="absolute left-[3.5rem] top-12 bottom-12 w-px bg-white/5" />
            </div>
        )
    }
];

export function FeatureDeepDives() {
    return (
        <section className="bg-[#0B0E14] py-48 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-72">
                {deepDives.map((item, idx) => (
                    <div key={idx} className={cn(
                        "flex flex-col lg:flex-row items-center gap-24 lg:gap-32",
                        idx % 2 === 1 && "lg:flex-row-reverse"
                    )}>
                        {/* Content Area */}
                        <div className="flex-1 space-y-10">
                            <BlurFade delay={0.2} inView direction={idx % 2 === 0 ? "right" : "left"}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
                                        <item.Icon className="w-7 h-7" style={{ color: item.accent }} />
                                    </div>
                                    <span className="text-xs font-black tracking-[0.4em] text-gray-500 uppercase">
                                        {item.subtitle}
                                    </span>
                                </div>

                                <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-[-0.05em] mb-10 leading-[0.85]">
                                    {item.title.split(' ')[0]} <br />
                                    <span style={{ color: item.accent }}>{item.title.split(' ').slice(1).join(' ')}</span>
                                </h2>

                                <p className="text-xl text-gray-500 leading-relaxed max-w-xl mb-12 font-medium tracking-tight">
                                    {item.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-16">
                                    {item.features.map((feat, fidx) => (
                                        <div key={fidx} className="flex items-center gap-3 text-white font-black tracking-tight uppercase text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.accent }} />
                                            {feat}
                                        </div>
                                    ))}
                                </div>

                                <button className="group flex items-center gap-6 text-sm font-black uppercase tracking-[0.3em] text-white transition-all">
                                    <span>Initialize Protocol</span>
                                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                                </button>
                            </BlurFade>
                        </div>

                        {/* Visual Representation */}
                        <div className="flex-1 w-full relative">
                            <BlurFade delay={0.4} inView direction={idx % 2 === 0 ? "left" : "right"}>
                                <div className="relative aspect-[4/3] rounded-[3rem] bg-white/[0.02] border border-white/10 p-2 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                    <div className="h-full w-full rounded-[2.5rem] bg-[#0B0E14] border border-white/5 overflow-hidden flex flex-col p-1">
                                        {/* Window Header */}
                                        <div className="h-10 w-full flex items-center px-6 border-b border-white/5 gap-2 flex-none">
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-white/10" />
                                                <div className="w-2 h-2 rounded-full bg-white/10" />
                                                <div className="w-2 h-2 rounded-full bg-white/10" />
                                            </div>
                                            <div className="ml-4 h-3 w-48 bg-white/5 rounded-full" />
                                        </div>

                                        {/* Graphic Content */}
                                        <div className="flex-1 relative">
                                            <item.Graphic />
                                        </div>

                                        <div className="w-full h-px bg-white/5" />

                                        <div className="w-full grid grid-cols-3 gap-8 px-8 flex-none h-20 items-center">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="space-y-3">
                                                    <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                                    <div className="h-2 w-2/3 bg-white/[0.02] rounded-full" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* High-end Overlay */}
                                    <div className="absolute top-12 right-12 p-6 rounded-3xl bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl z-20">
                                        <div className="flex items-center gap-4 mb-1">
                                            <div className="p-2 rounded-xl bg-white/5">
                                                <LineChart className="w-5 h-5" style={{ color: item.accent }} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">{item.stat}</span>
                                                <span className="text-2xl font-heading font-black text-white">{item.value}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
