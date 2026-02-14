"use client";

import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Search,
    Cpu,
    Dna,
    Settings,
    Camera,
    LineChart,
    ShieldCheck,
    BookOpen,
    DollarSign,
    UserCog,
    Network,
    Target,
    Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RetroGrid } from "@/components/ui/retro-grid";

const features = {
    competitive: [
        {
            Icon: TrendingUp,
            name: "Investment Whale",
            description: "Stop guessing and start winning—track big-money market moves in real-time to flip cards like a pro.",
            accent: "var(--primary)",
            className: "col-span-3 lg:col-span-2",
            image: "/investment-whale.jpg",
        },
        {
            Icon: Search,
            name: "Transfer Scout",
            description: "Stop overpaying—use our similarity engine to find budget-friendly clones of the most expensive meta players.",
            accent: "var(--primary)",
            className: "col-span-3 lg:col-span-1",
            image: "/transfer-scout.png",
        },
        {
            Icon: Cpu,
            name: "SBC Solutionist",
            description: "The fastest way to 33 chemistry—get instant, cheapest-possible solutions using players already in your club.",
            accent: "var(--primary)",
            className: "col-span-3 lg:col-span-1",
            image: "/sbc-solutionist.png",
        },
        {
            Icon: Dna,
            name: "Evo-Path Optimizer",
            description: "Map out every possible upgrade path and max your favorite cards with predictive stat modeling.",
            accent: "var(--primary)",
            className: "col-span-3 lg:col-span-1",
            image: "/evo-path.png",
        },
        {
            Icon: Settings,
            name: "Tactics Simulator",
            description: "Stop copying YouTubers—get custom tactical sliders and instructions tailored specifically to your squad's unique PlayStyles.",
            accent: "var(--primary)",
            className: "col-span-3 lg:col-span-1",
            image: "/tactics-simulator.png",
        },
        {
            Icon: Camera,
            name: "Post-Match Reviewer",
            description: "Scans your match-end screenshots to \"roast\" your performance and identify exactly where you lost control.",
            accent: "var(--primary)",
            className: "col-span-3 lg:col-span-3",
            image: "/post-match.png",
        },
    ],
    career: [
        {
            Icon: LineChart,
            name: "Wonderkid Whisperer",
            description: "Hunt down the world’s best 15-year-olds and build a dynasty that lasts a decade.",
            accent: "var(--secondary)",
            className: "col-span-3 lg:col-span-2",
            image: "/wonderkid-whisperer.png",
        },
        {
            Icon: ShieldCheck,
            name: "Realism Enforcer",
            description: "Keep it real—our virtual Board of Directors blocks unrealistic transfers to keep your save authentic.",
            accent: "var(--secondary)",
            className: "col-span-3 lg:col-span-1",
            image: "/realism-enforcer.png",
        },
        {
            Icon: BookOpen,
            name: "Storyline Generator",
            description: "Turn match results into a movie—generate dynamic news drama, locker room rumors, and press scripts.",
            accent: "var(--secondary)",
            className: "col-span-3 lg:col-span-1",
            image: "/storyline-generator.png",
        },
        {
            Icon: DollarSign,
            name: "Financial Auditor",
            description: "Stay out of debt—track every penny of revenue to ensure your transfer spending stays FFP-compliant.",
            accent: "var(--secondary)",
            className: "col-span-3 lg:col-span-1",
            image: "/financial-auditor.png",
        },
        {
            Icon: UserCog,
            name: "Manager Persona AI",
            description: "Get tactical advice with attitude—receive critiques or praise from AI versions of the world's most iconic managers.",
            accent: "var(--secondary)",
            className: "col-span-3 lg:col-span-1",
            image: "/manager-persona.png",
        },
        {
            Icon: Network,
            name: "Sister Club Scout",
            description: "Build a global loan army—identify exactly which partner clubs provide the best growth for your top prospects.",
            accent: "var(--secondary)",
            className: "col-span-3 lg:col-span-3",
            image: "/sister-club.png",
        },
    ]
};

export function BentoFeatures() {
    const [activeTab, setActiveTab] = useState<"competitive" | "career">("competitive");

    return (
        <section className="py-32 bg-background relative overflow-hidden px-6 transition-colors duration-500">
            <RetroGrid className="opacity-30" />
            <div className="max-w-7xl mx-auto relative z-10">
                <BlurFade delay={0.2} inView>
                    <div className="mb-20 text-center">
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground uppercase tracking-tighter mb-10 leading-none">
                            The <span className={activeTab === "competitive" ? "text-primary" : "text-secondary"}>roadmap</span> to {activeTab === "competitive" ? "elite" : "championship"}
                        </h2>

                        {/* Hub Toggle */}
                        <div className="inline-flex p-1.5 bg-foreground/5 border border-foreground/10 rounded-2xl backdrop-blur-3xl mb-12">
                            <button
                                onClick={() => setActiveTab("competitive")}
                                className={cn(
                                    "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2",
                                    activeTab === "competitive" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Target className="w-3.5 h-3.5" /> Pro-Grinder Hub
                            </button>
                            <button
                                onClick={() => setActiveTab("career")}
                                className={cn(
                                    "px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2",
                                    activeTab === "career" ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Trophy className="w-3.5 h-3.5" /> The Boardroom
                            </button>
                        </div>
                    </div>
                </BlurFade>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {features[activeTab].map((feature, idx) => (
                            <BlurFade key={feature.name} delay={0.05 * idx} inView>
                                <MagicCard
                                    className={cn(
                                        feature.className,
                                        "rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 group/card"
                                    )}
                                    gradientColor={feature.accent + "11"}
                                >
                                    <div className="p-10 h-full flex flex-col justify-between relative z-10">
                                        <div>
                                            <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 backdrop-blur-xl">
                                                <feature.Icon className="w-7 h-7" style={{ color: feature.accent }} />
                                            </div>
                                            <h3 className="text-3xl font-heading font-black text-foreground mb-6 uppercase tracking-tighter">
                                                {feature.name}
                                            </h3>
                                            <p className="max-w-[80%] text-muted-foreground font-medium leading-relaxed text-base">
                                                {feature.description}
                                            </p>
                                        </div>

                                        {(feature as any).image && (
                                            <div className="absolute inset-0 z-[-1] opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                                                <img
                                                    src={(feature as any).image}
                                                    alt={feature.name}
                                                    className="w-full h-full object-cover rounded-[2.5rem]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent transition-colors duration-500" />
                                            </div>
                                        )}

                                        <div className="mt-12 flex items-center gap-3 group/btn cursor-pointer">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 group-hover/btn:text-foreground transition-colors">Development Protocol</span>
                                                <div className="h-[2px] w-0 bg-current transition-all duration-500 group-hover/btn:w-full" style={{ color: feature.accent }} />
                                            </div>
                                            <div className="w-8 h-[1px] bg-foreground/10 group-hover/btn:w-16 group-hover/btn:bg-foreground/30 transition-all duration-700" />
                                        </div>
                                    </div>
                                </MagicCard>
                            </BlurFade>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
