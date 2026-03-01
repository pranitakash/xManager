"use client";

import { motion, type Variants } from "framer-motion";
import {
    BarChart3,
    Lightbulb,
    Database,
    AlertTriangle,
    Shuffle,
    Info,
    ShieldAlert
} from "lucide-react";

interface ToolResultCardProps {
    result: Record<string, unknown>;
}

function formatKey(key: string): string {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).trim();
}

export function ToolResultCard({ result }: ToolResultCardProps) {
    if (!result) return null;

    // Ordered known keys for better layout
    const knownKeys = ["analysis", "primaryRecommendation", "supportingData", "riskFactors", "alternatives"];
    const otherKeys = Object.keys(result).filter(k => !knownKeys.includes(k));

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full flex flex-col gap-5 mt-2"
        >
            {/* Analysis Section */}
            {result.analysis && typeof result.analysis === "string" && (
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-[#1E293B]/60 to-[#0F172A]/60 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-md shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shadow-inner">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <h3 className="text-blue-400 font-bold tracking-[0.15em] uppercase text-xs">Analysis</h3>
                    </div>
                    <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-[15px]">
                        {result.analysis as string}
                    </div>
                </motion.div>
            )}

            {/* Primary Recommendation Section */}
            {result.primaryRecommendation && typeof result.primaryRecommendation === "string" && (
                <motion.div variants={itemVariants} className="bg-gradient-to-br from-emerald-950/40 to-emerald-900/10 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                        <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/30 shadow-inner">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <h3 className="text-emerald-400 font-bold tracking-[0.15em] uppercase text-xs">Primary Recommendation</h3>
                    </div>
                    <div className="text-emerald-50/90 leading-relaxed whitespace-pre-wrap text-[15px] font-medium relative z-10">
                        {result.primaryRecommendation as string}
                    </div>
                </motion.div>
            )}

            {/* Grid for other sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Supporting Data */}
                {Array.isArray(result.supportingData) && result.supportingData.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 col-span-1 md:col-span-2 shadow-lg">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                                <Database className="w-5 h-5" />
                            </div>
                            <h3 className="text-purple-400 font-bold tracking-[0.15em] uppercase text-xs">Supporting Data</h3>
                        </div>
                        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {result.supportingData.map((item: any, idx: number) => (
                                <div key={idx} className="bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col gap-3 hover:bg-black/60 transition-colors">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Entry #{idx + 1}</span>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {Object.entries(item)
                                            .filter(([, v]) => typeof v === "string" || typeof v === "number")
                                            .map(([k, v]) => (
                                                <div key={k} className="flex flex-col gap-1">
                                                    <span className="text-[10px] text-gray-500 font-medium uppercase">{formatKey(k)}</span>
                                                    <span className="text-sm text-gray-200 font-medium line-clamp-3" title={String(v)}>{String(v)}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Risk Factors */}
                {Array.isArray(result.riskFactors) && result.riskFactors.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-red-950/20 to-black/20 border border-red-500/20 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-red-500/10 rounded-xl text-red-500 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h3 className="text-red-400 font-bold tracking-[0.15em] uppercase text-xs">Risk Factors</h3>
                        </div>
                        <ul className="space-y-4">
                            {(result.riskFactors as string[]).map((risk, idx) => (
                                <li key={idx} className="flex gap-3 text-[14px] text-gray-300 items-start bg-red-500/[0.02] p-3 rounded-xl border border-red-500/10 hover:bg-red-500/[0.04] transition-colors">
                                    <ShieldAlert className="w-4 h-4 text-red-500/60 mt-0.5 shrink-0" />
                                    <span className="leading-snug">{risk}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Alternatives */}
                {Array.isArray(result.alternatives) && result.alternatives.length > 0 && (
                    <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-950/10 to-black/20 border border-amber-500/20 rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20">
                                <Shuffle className="w-5 h-5" />
                            </div>
                            <h3 className="text-amber-500 font-bold tracking-[0.15em] uppercase text-xs">Alternatives</h3>
                        </div>
                        <ul className="space-y-4">
                            {(result.alternatives as string[]).map((alt, idx) => (
                                <li key={idx} className="flex gap-3 text-[14px] text-gray-300 items-start bg-amber-500/[0.02] p-3 rounded-xl border border-amber-500/10 hover:bg-amber-500/[0.04] transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                                    <span className="leading-snug">{alt}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}

                {/* Other Keys */}
                {otherKeys.map(key => {
                    const value = result[key];
                    if (value == null || (Array.isArray(value) && value.length === 0) || value === "") return null;

                    return (
                        <motion.div key={key} variants={itemVariants} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 col-span-1 md:col-span-2 shadow-lg w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/5 rounded-xl text-gray-400 border border-white/10">
                                    <Info className="w-5 h-5" />
                                </div>
                                <h3 className="text-gray-300 font-bold tracking-[0.15em] uppercase text-xs">{formatKey(key)}</h3>
                            </div>
                            {typeof value === "string" ? (
                                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px] bg-black/20 p-4 rounded-xl border border-white/5">
                                    {value as string}
                                </div>
                            ) : typeof value === "number" ? (
                                <div className="text-gray-200 text-3xl font-light tracking-tight px-2">
                                    {value as number}
                                </div>
                            ) : Array.isArray(value) ? (
                                <ul className="space-y-2 text-gray-300 text-[14px] bg-black/20 p-4 rounded-xl border border-white/5">
                                    {value.map((v, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-gray-500 mt-1">•</span>
                                            <span>{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : typeof value === "object" ? (
                                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                                        {Object.entries(value as object)
                                            .filter(([, v]) => typeof v === "string" || typeof v === "number")
                                            .map(([k, v]) => (
                                                <div key={k} className="flex flex-col gap-1.5 bg-white/[0.02] p-3 rounded-lg border border-white/[0.02]">
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">{formatKey(k)}</span>
                                                    <span className="text-[14px] text-gray-200 font-medium">{String(v)}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-400 overflow-hidden text-ellipsis text-sm bg-black/20 p-3 rounded-xl">
                                    {JSON.stringify(value)}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
