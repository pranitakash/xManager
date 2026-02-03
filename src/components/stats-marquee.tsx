"use client";

import { Marquee } from "@/components/ui/marquee";

const stats = [
    { label: "Neural Savings", value: "1.2M", color: "#00FF41" },
    { label: "Elite Optimizations", value: "8.4K", color: "#D4AF37" },
    { label: "Masterpieces Drafted", value: "1.2K", color: "#00FF41" },
    { label: "Ops Latency", value: "0.4ms", color: "#D4AF37" },
    { label: "SBCs Solved", value: "240K", color: "#00FF41" },
];

export function StatsMarquee() {
    return (
        <div className="bg-[#0B0E14] py-16 overflow-hidden">
            <Marquee pauseOnHover className="[--duration:40s]">
                {stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-8 mx-16">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">{stat.label}</span>
                        <span className="text-4xl font-heading font-black text-white tracking-tighter" style={{ color: stat.color }}>{stat.value}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10 ml-8" />
                    </div>
                ))}
            </Marquee>
        </div>
    );
}
