"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/ui/blur-fade";
import { TrendingDown, Timer, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

const problems = [
    {
        Icon: Timer,
        title: "Market Latency",
        description: "Standard indexers suffer from stale data. xManager provides real-time liquidity depth analysis.",
        color: "#EF4444"
    },
    {
        Icon: ShieldAlert,
        title: "Evolution Risk",
        description: "Blindly committing to Evo paths is for amateurs. Our predictive simulator maps the endpoint first.",
        color: "#F59E0B"
    },
    {
        Icon: TrendingDown,
        title: "Tactical Rot",
        description: "Don't import broken meta tactics. xManager synthesizes custom game plans using neural profiling.",
        color: "#3B82F6"
    }
];

export function ProblemSection() {
    return (
        <section className="py-40 bg-background relative overflow-hidden px-6 transition-colors duration-500">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <BlurFade delay={0.1} inView>
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground uppercase leading-none tracking-tighter">
                                Stop <span className="text-primary">Bottling</span> <br />
                                The Weekend League.
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                                Most players lose games before they even kick off. From sweaty tactical mismatches to market crashes that wipe out your club value, the pitch is a minefield.
                            </p>
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.2} inView>
                        <div className="p-8 rounded-[2.5rem] bg-foreground/5 border border-foreground/10 relative overflow-hidden group">
                            <div className="space-y-8 relative z-10">
                                {[
                                    { title: "Market Volatility", desc: "Stop losing millions when a new promo drops. We track the whales so you don't get liquidated." },
                                    { title: "Tactical Stagnation", desc: "Stop copying YouTubers. Get instructions that actually fit your players and PlayStyles." },
                                    { title: "Career Stale-ness", desc: "No more signing the same 3 wonderkids. We bring the drama back to your save." }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <h4 className="text-foreground font-black uppercase tracking-widest text-xs flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            {item.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Background Texture */}
            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
                )}
            />
        </section>
    );
}
