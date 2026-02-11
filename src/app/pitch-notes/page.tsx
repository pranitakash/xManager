"use client";

import { Navbar } from "@/components/navbar";
import { BlurFade } from "@/components/ui/blur-fade";
import { RetroGrid } from "@/components/ui/retro-grid";
import { Particles } from "@/components/ui/particles";
import { MainFooter } from "@/components/main-footer";
import { Zap, Target, Trophy, TrendingUp } from "lucide-react";

export default function PitchNotesPage() {
    return (
        <main className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#00FF41]/30 selection:text-[#00FF41] relative flex flex-col">
            <Navbar />
            <RetroGrid className="opacity-10" />

            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={100}
                    staticity={50}
                    color="#00FF41"
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <BlurFade delay={0.1}>
                        <div className="flex flex-col items-start mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#00FF41] mb-6 animate-pulse">
                                Live Intelligence Update
                            </span>
                            <h1 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                                Pitch <span className="text-[#00FF41]">Notes</span>
                            </h1>
                            <p className="text-gray-400 text-xl font-medium tracking-tight max-w-2xl leading-relaxed">
                                Industrial-grade tactical synthesis and real-time market pulse. Everything you need to dominate the meta.
                            </p>
                        </div>
                    </BlurFade>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Meta Shift: The 4-3-2-1 Dominance",
                                icon: <Target className="w-5 h-5" />,
                                date: "Feb 12, 2026",
                                category: "Tactics",
                                description: "How to properly set up the hybrid wing-back system that's currently breaking the weekend league benchmarks."
                            },
                            {
                                title: "Market Pulse: Elite Icons Correction",
                                icon: <TrendingUp className="w-5 h-5" />,
                                date: "Feb 11, 2026",
                                category: "Trading",
                                description: "Our neural monitors detect a massive liquidity shift in high-tier icon cards. Time to rebalance."
                            },
                            {
                                title: "Weekend League Consensus Report",
                                icon: <Trophy className="w-5 h-5" />,
                                date: "Feb 10, 2026",
                                category: "Comp",
                                description: "Aggregation of top 100 finish data. The consensus on direct passing vs. balanced build-up."
                            }
                        ].map((note, i) => (
                            <BlurFade key={note.title} delay={0.2 + i * 0.1}>
                                <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#00FF41]/30 hover:bg-white/[0.07] transition-all duration-500 cursor-pointer h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-[#00FF41]/10 flex items-center justify-center text-[#00FF41] border border-[#00FF41]/20">
                                            {note.icon}
                                        </div>
                                        <div className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400">
                                            {note.category}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 leading-tight group-hover:text-[#00FF41] transition-colors">
                                        {note.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-1 italic">
                                        "{note.description}"
                                    </p>
                                    <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                                            {note.date}
                                        </span>
                                        <Zap className="w-4 h-4 text-gray-800" />
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            <div className="mt-auto">
                <MainFooter />
            </div>
        </main>
    );
}
