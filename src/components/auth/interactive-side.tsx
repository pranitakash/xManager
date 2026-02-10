"use client";

import { motion } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { TextAnimate } from "@/components/ui/text-animate";
import { Zap, Shield, Trophy, Target } from "lucide-react";

const floatingIcons = [
    { Icon: Zap, color: "#00FF41", top: "20%", left: "15%", delay: 0 },
    { Icon: Shield, color: "#D4AF37", top: "60%", left: "25%", delay: 2 },
    { Icon: Trophy, color: "#00FF41", top: "30%", left: "70%", delay: 1 },
    { Icon: Target, color: "#D4AF37", top: "75%", left: "65%", delay: 3 },
];

export function InteractiveSide() {
    return (
        <div className="relative w-full h-full bg-[#0B0E14] overflow-hidden flex flex-col items-center justify-center p-12">
            {/* Background Animations */}
            <div className="absolute inset-0 z-0">
                <FlickeringGrid
                    className="absolute inset-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                    squareSize={4}
                    gridGap={6}
                    color="#00FF41"
                    maxOpacity={0.15}
                    flickerChance={0.1}
                />
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    staticity={30}
                    color="#00FF41"
                    size={0.6}
                />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FF41]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] animate-pulse delay-700" />

            {/* Floating Icons */}
            {floatingIcons.map(({ Icon, color, top, left, delay }, index) => (
                <motion.div
                    key={index}
                    className="absolute z-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
                    style={{ top, left }}
                    initial={{ y: 0 }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay,
                        ease: "easeInOut"
                    }}
                >
                    <Icon className="w-8 h-8" style={{ color }} />
                </motion.div>
            ))}

            {/* Content Overlay */}
            <div className="relative z-20 text-center space-y-8 max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20 text-[#00FF41] text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                >
                    <Zap className="w-3 h-3 fill-current" />
                    Elite Access Only
                </motion.div>

                <div className="space-y-4">
                    <TextAnimate
                        by="word"
                        animation="blurInUp"
                        duration={0.5}
                        className="text-5xl md:text-6xl font-heading font-black text-white uppercase italic tracking-tighter leading-tight"
                    >
                        Master the Market.
                    </TextAnimate>
                    <TextAnimate
                        by="word"
                        animation="blurInUp"
                        duration={0.5}
                        delay={0.2}
                        className="text-5xl md:text-6xl font-heading font-black text-[#00FF41] uppercase italic tracking-tighter leading-tight"
                    >
                        Own the Pitch.
                    </TextAnimate>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-gray-400 font-medium leading-relaxed md:text-lg"
                >
                    Join the most advanced football management ecosystem. Algorithmic scouting, financial audits, and tactical supremacy.
                </motion.p>
            </div>

            {/* Decorative Lines */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#00FF41]/10 to-transparent" />
        </div>
    );
}
