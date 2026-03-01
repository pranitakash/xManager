"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp, Search, Cpu, Dna, Settings, Camera,
    Sparkles, ShieldCheck, PenTool, PieChart, Brain, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "lab" | "boardroom";

interface Feature {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    shortName: string;
    toolId: string;
    prompt: string;
}

const labFeatures: Feature[] = [
    {
        icon: TrendingUp,
        name: "Investment Whale",
        shortName: "Whale",
        toolId: "investment-whale",
        prompt: "Analyze the current market trends and identify the best investment opportunities for card flipping."
    },
    {
        icon: Search,
        name: "Transfer Scout",
        shortName: "Scout",
        toolId: "transfer-scout",
        prompt: "Find budget-friendly alternatives to the most expensive meta players in the current market."
    },
    {
        icon: Cpu,
        name: "SBC Solutionist",
        shortName: "SBC",
        toolId: "sbc-solutionist",
        prompt: "Help me find the cheapest solution for the current active SBCs using my club players."
    },
    {
        icon: Dna,
        name: "Evo-Path Optimizer",
        shortName: "Evo",
        toolId: "evo-path-optimizer",
        prompt: "Map out the optimal evolution path to maximize my card's potential and stats."
    },
    {
        icon: Settings,
        name: "Tactics Simulator",
        shortName: "Tactics",
        toolId: "tactics-simulator",
        prompt: "Generate custom tactical instructions and slider values tailored to my squad's PlayStyles."
    },
    {
        icon: Camera,
        name: "Post-Match Reviewer",
        shortName: "Review",
        toolId: "post-match-reviewer",
        prompt: "Analyze my last match and identify where I lost control of the game."
    },
];

const boardroomFeatures: Feature[] = [
    {
        icon: Sparkles,
        name: "Wonderkid Whisperer",
        shortName: "Wonderkids",
        toolId: "wonderkid-whisperer",
        prompt: "Detect hidden gems and high-growth prospects before they hit the global radar."
    },
    {
        icon: ShieldCheck,
        name: "Realism Enforcer",
        shortName: "Realism",
        toolId: "realism-enforcer",
        prompt: "Apply algorithmic constraints to ensure my transfers stay grounded in reality."
    },
    {
        icon: PenTool,
        name: "Storyline Generator",
        shortName: "Storyline",
        toolId: "storyline-generator",
        prompt: "Create a dynamic narrative arc and press scenario to deepen my club's lore this season."
    },
    {
        icon: PieChart,
        name: "Financial Auditor",
        shortName: "Finance",
        toolId: "financial-auditor",
        prompt: "Track my club's revenue, transfer profit, and wage-to-turnover ratios in real-time."
    },
    {
        icon: Brain,
        name: "Manager Persona AI",
        shortName: "Persona",
        toolId: "manager-persona-ai",
        prompt: "Help me develop a unique coaching identity that influences morale and negotiation tactics."
    },
    {
        icon: Globe,
        name: "Sister Club Scout",
        shortName: "Sister Clubs",
        toolId: "sister-club-scout",
        prompt: "Manage my global network of affiliates to loan talent and monitor development."
    },
];

interface AgentSidebarProps {
    mode: Mode;
    onFeatureClick: (toolId: string, prompt: string) => void;
    activeFeature: string | null;
}

export function AgentSidebar({ mode, onFeatureClick, activeFeature }: AgentSidebarProps) {
    const features = mode === "lab" ? labFeatures : boardroomFeatures;
    const accentColor = mode === "lab" ? "#00FF41" : "#EAB308";

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed left-4 top-24 bottom-4 z-40 w-16 hover:w-56 transition-all duration-500 group/sidebar"
        >
            <div className="h-full bg-[#0B0E14]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-2 flex flex-col gap-1 shadow-2xl overflow-hidden">
                {/* Mode Label */}
                <div className="px-3 py-3 mb-1">
                    <div
                        className="w-2 h-2 rounded-full mx-auto group-hover/sidebar:mx-0 transition-all duration-300"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: `0 0 12px ${accentColor}60`
                        }}
                    />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-600 mt-2 hidden group-hover/sidebar:block transition-all truncate">
                        {mode === "lab" ? "Lab Mode" : "Boardroom"}
                    </span>
                </div>

                <div className="w-8 mx-auto group-hover/sidebar:w-full border-t border-white/5 mb-1 transition-all duration-300" />

                {/* Feature Buttons */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col gap-1 flex-1"
                    >
                        {features.map((feature) => {
                            const isActive = activeFeature === feature.toolId;
                            return (
                                <button
                                    key={feature.name}
                                    onClick={() => onFeatureClick(feature.toolId, feature.prompt)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group/btn text-left w-full min-w-0",
                                        isActive
                                            ? "bg-white/10 border border-white/10"
                                            : "hover:bg-white/5 border border-transparent"
                                    )}
                                    title={feature.name}
                                >
                                    <div className={cn(
                                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300",
                                        isActive
                                            ? `border text-white`
                                            : "text-gray-500 group-hover/btn:text-gray-300"
                                    )}
                                        style={isActive ? {
                                            backgroundColor: `${accentColor}15`,
                                            borderColor: `${accentColor}30`,
                                            color: accentColor
                                        } : {}}
                                    >
                                        <feature.icon className="w-4 h-4" />
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-bold uppercase tracking-wider truncate hidden group-hover/sidebar:block transition-all duration-300",
                                        isActive ? "text-white" : "text-gray-500 group-hover/btn:text-gray-300"
                                    )}>
                                        {feature.name}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.aside>
    );
}
