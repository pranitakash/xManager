"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { SelectionWheel } from "@/components/pro-hub/selection-wheel";
import { RetroGrid } from "@/components/ui/retro-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Particles } from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function ProHub() {
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
                color="#00FF41"
            />

            <div className="flex-1 container mx-auto px-12 relative z-10 flex items-center justify-between gap-12">
                {/* Left Side: Editorial Content */}
                <div className="flex-1 max-w-2xl">
                    <BlurFade delay={0.1}>
                        <div className="text-left">
                            <h1 className="text-6xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-8">
                                <TextAnimate animation="blurInUp" by="word" once>
                                    xManager
                                </TextAnimate>
                                <span className="text-[#00FF41] block">
                                    <TextAnimate animation="blurInUp" by="word" once delay={0.3}>
                                        Pro Hub
                                    </TextAnimate>
                                </span>
                            </h1>

                            <div className="space-y-6 border-l-2 border-[#00FF41]/30 pl-8">
                                <TypingAnimation
                                    className="text-gray-400 text-xl md:text-2xl font-medium tracking-tight leading-relaxed text-left max-w-lg"
                                    duration={25}
                                    delay={1000}
                                    startOnView
                                >
                                    Unlocking the future of tactical simulation. Elevate your squad with elite data scouting and AI-driven growth.
                                </TypingAnimation>

                                <BlurFade delay={1.5}>
                                    <div className="flex gap-4">
                                        <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase font-black tracking-widest text-gray-500">
                                            Version 4.0.2
                                        </div>
                                        <div className="px-4 py-2 bg-[#00FF41]/10 rounded-full border border-[#00FF41]/20 text-[10px] uppercase font-black tracking-widest text-[#00FF41]">
                                            Elite Enabled
                                        </div>
                                    </div>
                                </BlurFade>
                            </div>
                        </div>
                    </BlurFade>
                </div>

                {/* Right Side: The Wheel */}
                <BlurFade delay={0.5} className="flex-1 flex items-center justify-center">
                    <div className="relative scale-90 lg:scale-100">
                        <SelectionWheel />
                    </div>
                </BlurFade>
            </div>

            {/* Atmospheric Glow */}
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#00FF41]/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        </main>
    );
}
