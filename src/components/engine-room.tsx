"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { Cpu, Server, Database, Globe, Share2, ShieldCheck, Zap } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function EngineRoom() {
    return (
        <section id="engine" className="py-48 bg-[#0B0E14] relative px-6 overflow-hidden">
            <FlickeringGrid
                className="absolute inset-0 z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
                squareSize={4}
                gridGap={6}
                color="#60A5FA"
                maxOpacity={0.15}
                flickerChance={0.1}
            />
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32 relative z-10">

                {/* Visual Architecture */}
                <div className="flex-1 order-2 lg:order-1 relative h-[600px] flex items-center justify-center">
                    <BlurFade delay={0.3} inView>
                        <div className="relative aspect-square w-full max-w-[500px] rounded-full border border-white/5 flex items-center justify-center">
                            {/* Advanced Rings */}
                            <div className="absolute inset-[-10%] rounded-full border border-white/[0.02] animate-[spin_60s_linear_infinite]" />
                            <div className="absolute inset-4 rounded-full border border-dashed border-white/5 animate-spin-slow" />
                            <div className="absolute inset-16 rounded-full border border-white/5 animate-reverse-spin" />

                            {/* Core Component */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.05, 1],
                                    boxShadow: [
                                        "0 0 20px rgba(0,255,65,0.2)",
                                        "0 0 60px rgba(0,255,65,0.4)",
                                        "0 0 20px rgba(0,255,65,0.2)"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-40 h-40 rounded-[2.5rem] bg-[#00FF41] flex items-center justify-center relative z-10"
                            >
                                <div className="absolute inset-2 rounded-[2rem] border-2 border-[#0B0E14]/20 border-t-transparent animate-spin-slow" />
                                <Cpu className="w-20 h-20 text-[#0B0E14] fill-[#0B0E14]" />
                            </motion.div>

                            {/* Orbiting Infrastructure Nodes */}
                            {[Server, Database, Globe, Share2, ShieldCheck, Zap].map((Icon, idx) => {
                                const angle = (idx * 360) / 6;
                                return (
                                    <motion.div
                                        key={idx}
                                        className="absolute w-14 h-14 rounded-2xl bg-[#0B0E14] border border-white/10 flex items-center justify-center backdrop-blur-3xl shadow-2xl z-20 group"
                                        animate={{
                                            rotate: [0, 360],
                                        }}
                                        transition={{
                                            duration: 30,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        style={{
                                            transformOrigin: "center center",
                                            left: `calc(50% - 28px + ${Math.round(Math.cos((angle * Math.PI) / 180) * 200)}px)`,
                                            top: `calc(50% - 28px + ${Math.round(Math.sin((angle * Math.PI) / 180) * 200)}px)`,
                                        }}
                                    >
                                        <motion.div
                                            animate={{ rotate: [360, 0] }}
                                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Icon className="w-7 h-7 text-gray-500 group-hover:text-[#00FF41] transition-colors" />
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </BlurFade>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-12 order-1 lg:order-2">
                    <BlurFade delay={0.2} inView direction="left">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-[#00FF41] mb-8">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                            Machine Consensus Active
                        </div>

                        <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-[-0.05em] leading-[0.85] mb-10">
                            The Engine of <br />
                            <span className="text-[#00FF41]">Global Intel</span>
                        </h2>

                        <p className="text-xl text-gray-500 max-w-lg mb-12 font-medium tracking-tight leading-relaxed">
                            xManager is the Gaffer's secret weapon. We've built the ultimate brain for FC 25, syncing every match-day shift and market pulse directly to your lab.
                        </p>

                        <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Processing Efficiency</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00FF41]">98.4% Peak</span>
                            </div>

                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-6xl font-heading font-black text-white tracking-tighter">0.0039</span>
                                <span className="text-sm font-black text-[#00FF41] mb-2 tracking-widest uppercase">Tokens/Ops</span>
                            </div>

                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "98.4%" }}
                                    transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-full bg-gradient-to-r from-[#00FF41] to-[#D4AF37]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
                            </div>

                            <p className="mt-8 text-xs text-gray-600 font-bold uppercase tracking-widest leading-loose">
                                Neural compression reduces operational overhead by <span className="text-white">91.4%</span> against legacy REST-based scrapers.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00FF41]/5 blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
        </section>
    );
}
