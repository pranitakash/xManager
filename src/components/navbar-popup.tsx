"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";
import { Zap, Layout, BookOpen, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PopupContent {
    heading: string;
    description: string;
    icon: any;
    color: string;
}

const contentMap: Record<string, PopupContent> = {
    "Tactics": {
        heading: "Strategic Blueprint",
        description: "Master your managerial strategy with our advanced formation engine. Fine-tune player roles, set high-press triggers, and simulate tactical shifts to outsmart any opponent.",
        icon: Layout,
        color: "#00FF41",
    },
    "Clubhouse": {
        heading: "Management Hub",
        description: "The heart of your club. Manage player happiness, develop world-class youth prospects in the academy, and upgrade facilities to build a lasting football legacy.",
        icon: Zap,
        color: "#00FF41",
    },
    "Pitch Notes": {
        heading: "Directives & Updates",
        description: "Stay ahead of the meta with detailed patch breakdowns, community-driven insights, and exclusive analysis from top-tier managers. Never miss a critical update.",
        icon: BookOpen,
        color: "#00FF41",
    },
    "Elite": {
        heading: "Pro Excellence",
        description: "Unlock the pinnacle of management. Access VIP scouting networks, run millions of AI-powered match simulations, and join the most prestigious expert circle.",
        icon: Crown,
        color: "#D4AF37",
    },
};

export function NavbarPopup({ item, isOpen }: { item: string; isOpen: boolean }) {
    const content = contentMap[item];
    if (!content) return null;

    const Icon = content.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-[100] pointer-events-none"
                >
                    <MagicCard
                        className="w-80 p-6 bg-[#0B0E14]/90 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden rounded-2xl pointer-events-auto"
                        gradientColor={content.color + "20"}
                        gradientFrom={content.color}
                        gradientTo="#ffffff"
                        gradientOpacity={0.15}
                    >
                        <div className="space-y-4 relative z-10 text-left">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 shadow-inner"
                                style={{ backgroundColor: content.color + "10" }}
                            >
                                <Icon className="w-6 h-6" style={{ color: content.color }} />
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-black uppercase tracking-tight text-white">
                                    {content.heading}
                                </h4>
                                <p className="text-[12px] font-medium text-gray-400 leading-relaxed normal-case tracking-normal opacity-90">
                                    {content.description}
                                </p>
                            </div>

                            <div className="pt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#00FF41] group-hover:translate-x-1 transition-transform duration-300">
                                Launch Module <Zap className="w-2.5 h-2.5 fill-current" />
                            </div>
                        </div>

                        {/* Decorative Background Element */}
                        <div
                            className="absolute -right-4 -bottom-4 w-24 h-24 blur-3xl opacity-20 rounded-full"
                            style={{ backgroundColor: content.color }}
                        />
                    </MagicCard>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
