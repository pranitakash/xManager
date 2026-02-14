"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BlurFade } from "@/components/ui/blur-fade";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"competitive" | "career">("competitive");

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-4 pt-16 transition-colors duration-500">
            {/* Premium Background Backgrounds */}
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] opacity-20",
                )}
            />

            <div className="absolute inset-0 z-0">
                <Particles
                    className="absolute inset-0"
                    quantity={80}
                    staticity={30}
                    color={activeTab === "competitive" ? "#00FF41" : "#D4AF37"}
                />
            </div>

            <BlurFade delay={0.2} inView>
                <div className="flex justify-center mb-8">
                    <div className="px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                        <span className="text-primary font-black uppercase tracking-[0.3em]">FC 25</span>
                        <div className="w-1 h-1 rounded-full bg-foreground/20" />
                        <span>FIFA Universal Support</span>
                    </div>
                </div>
            </BlurFade>

            <BlurFade delay={0.25} inView>
                {/* Dual Path Toggle */}
                <div className="relative z-10 mb-16 flex p-1.5 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
                    <button
                        onClick={() => setActiveTab("competitive")}
                        className={cn(
                            "relative px-10 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-500",
                            activeTab === "competitive" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {activeTab === "competitive" && (
                            <motion.div
                                layoutId="toggle-bg"
                                className="absolute inset-0 bg-primary rounded-xl shadow-[0_0_30px_rgba(0,191,49,0.3)]"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Target className="w-3.5 h-3.5" /> Competitive
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("career")}
                        className={cn(
                            "relative px-10 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-500",
                            activeTab === "career" ? "text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {activeTab === "career" && (
                            <motion.div
                                layoutId="toggle-bg"
                                className="absolute inset-0 bg-secondary rounded-xl shadow-[0_0_30px_rgba(184,134,11,0.3)]"
                                transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <Trophy className="w-3.5 h-3.5" /> Career
                        </span>
                    </button>
                </div>
            </BlurFade>

            {/* Content Area */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                <BlurFade delay={0.4} inView>
                    <div className="flex flex-col items-center mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-4">
                            The Ultimate Sidekick for
                        </span>
                        <h1
                            className="text-[8vw] md:text-7xl font-heading font-black tracking-[-0.05em] text-foreground uppercase leading-[0.8] flex flex-col items-center"
                        >
                            <span className="text-muted-foreground/60 text-[4vw] md:text-4xl mb-2 tracking-tighter">FC 25 & FIFA Elite</span>
                            <span><span className="lowercase">x</span><span className={activeTab === "competitive" ? "text-primary" : "text-secondary"}>Manager</span></span>
                        </h1>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 mt-6">
                            The Only Way to Stop Bottling It.
                        </span>
                    </div>
                </BlurFade>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <BlurFade delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl font-medium leading-relaxed tracking-tight text-center">
                                {activeTab === "competitive"
                                    ? "Master the Meta. Stop the sweat and start dominating with industrial-grade tactical synthesis and real-time market pulse."
                                    : "No more unrealistic signings. Build a dynasty with procedural storylines and board logic that keeps your career mode actually real."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                                <InteractiveHoverButton
                                    className="h-14 px-10 text-white border-white/20"
                                    onClick={() => router.push(activeTab === "competitive" ? "/pro-hub" : "/boardroom")}
                                >
                                    {activeTab === "competitive" ? "Enter the Lab" : "Enter the Boardroom"}
                                </InteractiveHoverButton>
                                <InteractiveHoverButton
                                    className="h-14 px-10 border-white/10 text-white/70"
                                    onClick={() => router.push("/pitch-notes")}
                                >
                                    Watch Pitch Notes
                                </InteractiveHoverButton>
                            </div>
                        </BlurFade>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Background Gradients */}
            <div className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] blur-[160px] opacity-20 transition-colors duration-1000 -z-10",
                activeTab === "competitive" ? "bg-[#00FF41]" : "bg-[#D4AF37]"
            )} />
        </section>
    );
}
