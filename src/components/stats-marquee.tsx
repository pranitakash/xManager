"use client";

import { Marquee } from "@/components/ui/marquee";

const stats = [
    { label: "Neural Savings", value: "1.2M", color: "var(--primary)" },
    { label: "Elite Optimizations", value: "8.4K", color: "var(--secondary)" },
    { label: "Masterpieces Drafted", value: "1.2K", color: "var(--primary)" },
    { label: "Ops Latency", value: "0.4ms", color: "var(--secondary)" },
    { label: "SBCs Solved", value: "240K", color: "var(--primary)" },
];

export function StatsMarquee() {
    return (
        <div className="bg-background py-16 overflow-hidden transition-colors duration-500">
            <Marquee pauseOnHover className="[--duration:40s]">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-8 mx-16">
                        <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.5em]">{stat.label}</span>
                        <span className="text-4xl font-heading font-black text-foreground tracking-tighter" style={{ color: stat.color }}>{stat.value}</span>
                        <div className="w-1 h-1 rounded-full bg-foreground/10 ml-8" />
                    </div>
                ))}
            </Marquee>
        </div>
    );
}
