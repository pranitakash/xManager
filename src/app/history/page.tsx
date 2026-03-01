"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Bot, User, Shield, AlertCircle, Loader2, CheckCircle2, Search, ArrowLeft, Calendar } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { TOOL_INPUT_CONFIGS } from "@/lib/tool-input-config";
import type { HistoryEntry, Mode } from "@/lib/backend/types";

export default function HistoryDashboard() {
    const router = useRouter();
    const [mode, setMode] = useState<Mode>("lab");
    const [data, setData] = useState<Record<Mode, HistoryEntry[]>>({ lab: [], boardroom: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("/api/history?limit=50");
                if (!res.ok) {
                    if (res.status === 401) {
                        router.push("/auth");
                        return;
                    }
                    throw new Error("Failed to load history");
                }
                const json = await res.json();
                if (json.data) {
                    setData(json.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load history");
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [router]);

    const entries = data[mode] || [];

    return (
        <main className="min-h-screen bg-[#0B0E14] text-white selection:bg-white/10 flex flex-col relative">
            <Navbar />

            <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] opacity-10",
                )}
            />

            <div className="flex-1 w-full max-w-5xl mx-auto pt-32 px-6 pb-20 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4 text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white flex items-center gap-4">
                            <Clock className="w-8 h-8 text-[#00FF41]" />
                            Execution History
                        </h1>
                        <p className="text-gray-400 mt-2 font-medium">Review past tactical synthesis and executive briefings.</p>
                    </div>

                    {/* Mode Switcher */}
                    <div className="bg-[#0B0E14]/40 backdrop-blur-xl border border-white/5 p-1 rounded-2xl flex items-center gap-1 shadow-2xl self-start md:self-auto">
                        <button
                            onClick={() => setMode("lab")}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                                mode === "lab"
                                    ? "bg-[#00FF41]/15 text-[#00FF41] shadow-lg border border-[#00FF41]/20"
                                    : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                mode === "lab" ? "bg-[#00FF41] shadow-[0_0_8px_rgba(0,255,65,0.6)]" : "bg-gray-600"
                            )} />
                            Lab Engine
                        </button>
                        <button
                            onClick={() => setMode("boardroom")}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                                mode === "boardroom"
                                    ? "bg-[#EAB308]/15 text-[#EAB308] shadow-lg border border-[#EAB308]/20"
                                    : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            <div className={cn(
                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                mode === "boardroom" ? "bg-[#EAB308] shadow-[0_0_8px_rgba(234,179,8,0.6)]" : "bg-gray-600"
                            )} />
                            Boardroom
                        </button>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <div className="w-8 h-8 border-2 border-white/20 border-t-[#00FF41] rounded-full animate-spin mb-4" />
                        <span className="text-sm font-black uppercase tracking-widest text-[#00FF41] animate-pulse">Loading Archives...</span>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 bg-white/5 backdrop-blur-sm rounded-3xl">
                        <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold tracking-tight mb-2">No Records Found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-6">
                            You haven't run any {mode === "lab" ? "Tactical Lab" : "Boardroom"} tools yet.
                        </p>
                        <button
                            onClick={() => router.push(`/agent?mode=${mode}`)}
                            className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
                        >
                            Start Analysis
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {entries.map((entry, i) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => router.push(`/history/${entry.id}`)}
                                    className="group relative bg-[#0B0E14] border border-white/5 hover:border-white/10 rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-300 overflow-hidden hover:shadow-2xl hover:bg-white/[0.02]"
                                >
                                    {/* Hover gradient effect */}
                                    <div className={cn(
                                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                                        mode === "lab" ? "bg-gradient-to-r from-[#00FF41]/5 to-transparent" : "bg-gradient-to-r from-[#EAB308]/5 to-transparent"
                                    )} />

                                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between relative z-10">

                                        <div className="flex items-start gap-4 flex-1">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center border shrink-0",
                                                mode === "lab" ? "bg-[#00FF41]/10 border-[#00FF41]/20 text-[#00FF41]" : "bg-[#EAB308]/10 border-[#EAB308]/20 text-[#EAB308]"
                                            )}>
                                                {mode === "lab" ? <Bot className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-heading font-black tracking-tight text-lg text-white group-hover:text-white transition-colors">
                                                        {TOOL_INPUT_CONFIGS[entry.tool]?.displayName || entry.tool}
                                                    </h3>
                                                    <StatusBadge status={entry.status} />
                                                </div>
                                                <p className="text-gray-400 text-sm line-clamp-1 group-hover:text-gray-300 transition-colors">
                                                    {entry.inputSummary}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-gray-500 text-sm md:flex-col md:items-end md:gap-1 shrink-0 ml-16 md:ml-0">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(entry.createdAt).toLocaleDateString(undefined, {
                                                    month: "short", day: "numeric"
                                                })}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Atmospheric Glow */}
            <div className={cn(
                "fixed bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none translate-x-1/4 translate-y-1/4 transition-colors duration-1000",
                mode === "lab" ? "bg-[#00FF41]/5" : "bg-[#EAB308]/5"
            )} />
        </main>
    );
}

function StatusBadge({ status }: { status: string }) {
    const config: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string; bg: string }> = {
        pending: { icon: Clock, color: "text-yellow-500", label: "Queued", bg: "bg-yellow-500/10 border-yellow-500/20" },
        processing: { icon: Loader2, color: "text-blue-400", label: "Processing", bg: "bg-blue-400/10 border-blue-400/20" },
        success: { icon: CheckCircle2, color: "text-emerald-400", label: "Complete", bg: "bg-emerald-400/10 border-emerald-400/20" },
        failed: { icon: AlertCircle, color: "text-red-400", label: "Failed", bg: "bg-red-400/10 border-red-400/20" },
    };

    const c = config[status];
    if (!c) return null;
    const Icon = c.icon;

    return (
        <span className={cn("flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border", c.color, c.bg)}>
            <Icon className={cn("w-3 h-3", status === "processing" && "animate-spin")} />
            {c.label}
        </span>
    );
}
