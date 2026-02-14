"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Sparkles } from "lucide-react";
import { Particles } from "@/components/ui/particles";

export function FinalCta() {
    return (
        <section className="py-64 bg-background relative px-6 overflow-hidden transition-colors duration-500">
            <Particles
                className="absolute inset-0 z-0"
                quantity={150}
                ease={80}
                color="#00FF41"
                refresh
            />
            <div className="max-w-5xl mx-auto text-center relative z-10">
                <BlurFade delay={0.2} inView>
                    <div className="flex justify-center mb-16">
                        <div className="px-6 py-2 rounded-full bg-primary/5 border border-primary/20 flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                            <Sparkles className="w-3 h-3" /> Consensus Reached
                        </div>
                    </div>

                    <h2 className="text-[12vw] md:text-9xl font-heading font-black text-foreground uppercase tracking-[-0.07em] leading-[0.8] mb-16">
                        Initialize <br />
                        <span className="text-primary">Dominance</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <InteractiveHoverButton className="h-14 px-12 text-foreground border-foreground/20">
                            Initialize xManager
                        </InteractiveHoverButton>
                        <InteractiveHoverButton className="h-14 px-12 border-foreground/10 text-muted-foreground/70">
                            Watch Pitch Notes
                        </InteractiveHoverButton>
                    </div>
                </BlurFade>
            </div>
        </section>
    );
}
