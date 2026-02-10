"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { BoardroomWheel } from "@/components/boardroom/boardroom-wheel";
import { RetroGrid } from "@/components/ui/retro-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function BoardroomPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <main className="h-screen bg-[#0B0E14] text-white overflow-hidden relative flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#00FF41]/30 border-t-[#00FF41] rounded-full animate-spin" />
            </main>
        );
    }

    return (
        <main className="h-screen bg-[#0B0E14] text-white selection:bg-[#00FF41]/30 selection:text-[#00FF41] overflow-hidden relative flex flex-col">
            <Navbar />
            <RetroGrid className="opacity-10" />
            <Particles
                className="absolute inset-0 z-0"
                quantity={150}
                staticity={40}
                color="#EAB308"
            />

            <div className="flex-1 container mx-auto px-12 relative z-10 flex items-center justify-between gap-12">
                {/* Left Side: Editorial Content */}
                <div className="flex-1 max-w-2xl">
                    <BlurFade delay={0.1}>
                        <div className="text-left">
                            <h1 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                                <TextAnimate animation="blurInUp" by="word" once>
                                    Executive
                                </TextAnimate>
                                <span className="text-[#EAB308] block">
                                    <TextAnimate animation="blurInUp" by="word" once delay={0.3}>
                                        Boardroom
                                    </TextAnimate>
                                </span>
                            </h1>

                            <div className="space-y-6 border-l-2 border-[#EAB308]/30 pl-8">
                                <TypingAnimation
                                    className="text-gray-400 text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-left max-w-lg"
                                    duration={25}
                                    delay={1000}
                                    startOnView
                                >
                                    Welcome, Director. Command your club's future with elite administrative tools and financial oversight.
                                </TypingAnimation>

                                <BlurFade delay={1.5}>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase font-black tracking-widest text-gray-500">
                                            Fiscal Year 2026
                                        </div>
                                        <div className="px-4 py-2 bg-[#EAB308]/10 rounded-full border border-[#EAB308]/20 text-[10px] uppercase font-black tracking-widest text-[#EAB308]">
                                            Tier 1 Clearance
                                        </div>
                                    </div>
                                </BlurFade>
                            </div>
                        </div>
                    </BlurFade>
                </div>

                {/* Right Side: The Executive Wheel */}
                <BlurFade delay={0.5} className="flex-1 flex items-center justify-center">
                    <div className="relative scale-90 lg:scale-100">
                        <BoardroomWheel />
                    </div>
                </BlurFade>
            </div>

            {/* Atmospheric Glow */}
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#EAB308]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        </main>
    );
}
