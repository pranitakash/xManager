"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Bot, User, Shield, AlertCircle, Loader2, CheckCircle2, ArrowLeft, Terminal } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { TOOL_INPUT_CONFIGS } from "@/lib/tool-input-config";
import { ToolResultCard } from "@/components/agent/tool-result-card";
import type { HistoryDetailResponse } from "@/lib/backend/types";

export default function ExecutionDetail() {
    const router = useRouter();
    const params = useParams();
    const isReady = params && params.executionId;
    const executionId = params?.executionId as string;

    const [data, setData] = useState<HistoryDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isReady) return;

        const fetchDetail = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/history/${executionId}`);
                if (!res.ok) {
                    if (res.status === 401) {
                        router.push("/auth");
                        return;
                    }
                    if (res.status === 404) {
                        throw new Error("Execution record not found.");
                    }
                    throw new Error("Failed to load execution details.");
                }
                const json = await res.json();
                if (json.data) {
                    setData(json.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load execution details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [executionId, router, isReady]);

    if (!isReady || isLoading) {
        return (
            <main className="min-h-screen bg-[#0B0E14] text-white flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-[#00FF41] rounded-full animate-spin mb-4" />
                <span className="text-sm font-black uppercase tracking-widest text-[#00FF41] animate-pulse">Decrypting Record...</span>
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="min-h-screen bg-[#0B0E14] text-white flex items-center justify-center p-6">
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-3xl max-w-sm text-center">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h2 className="text-xl font-bold mb-2 text-white">Access Denied</h2>
                    <p className="font-medium text-sm mb-6">{error || "Could not retrieve the record."}</p>
                    <button
                        onClick={() => router.push("/history")}
                        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold tracking-wide transition-colors text-white"
                    >
                        Return to Archives
                    </button>
                </div>
            </main>
        );
    }

    const { mode, tool, status, executionTimeMs, createdAt, inputData, outputData, errorMessage } = data;
    const toolConfig = TOOL_INPUT_CONFIGS[tool];
    const displayName = toolConfig?.displayName || tool;

    return (
        <main className="min-h-screen bg-[#0B0E14] text-white selection:bg-white/10 flex flex-col relative overflow-hidden">
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

            <div className="flex-1 w-full max-w-4xl mx-auto pt-32 px-6 pb-20 relative z-10 flex flex-col">
                <button
                    onClick={() => router.push("/history")}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 text-sm font-medium self-start bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Archives
                </button>

                {/* Main Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border-b border-white/10 pb-8">
                        <div className="flex items-center gap-5">
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0 shadow-2xl",
                                mode === "lab" ? "bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.15)]" : "bg-[#EAB308]/10 border-[#EAB308]/30 text-[#EAB308] shadow-[0_0_30px_rgba(234,179,8,0.15)]"
                            )}>
                                {mode === "lab" ? <Bot className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-heading font-black tracking-tight text-white">{displayName}</h1>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                                        mode === "lab" ? "bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/20" : "bg-[#EAB308]/10 text-[#EAB308] border-[#EAB308]/20"
                                    )}>
                                        {mode === "lab" ? "Lab" : "Boardroom"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {new Date(createdAt).toLocaleString()}</span>
                                    {executionTimeMs && <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4" /> {(executionTimeMs / 1000).toFixed(2)}s</span>}
                                </div>
                            </div>
                        </div>
                        <StatusBadge status={status} />
                    </div>

                    {/* Input Data Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" /> User Configuration
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(inputData).map(([key, value]) => {
                                if (key === "image" || !value) return null;
                                const label = key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).trim();
                                const display: string = Array.isArray(value) ? (value as any[]).join(", ") : String(value);
                                return display.length > 0 ? (
                                    <div key={key}>
                                        <dt className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">{label}</dt>
                                        <dd className="text-sm text-white font-medium bg-[#0B0E14] border border-white/5 py-2 px-3 rounded-lg overflow-hidden text-ellipsis shadow-inner">
                                            {display}
                                        </dd>
                                    </div>
                                ) : null;
                            })}
                            {Boolean(inputData.image) && (
                                <div>
                                    <dt className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">Attachment</dt>
                                    <dd className="text-sm text-white font-medium bg-[#0B0E14] border border-white/5 py-2 px-3 rounded-lg flex items-center gap-2 shadow-inner">
                                        <span className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" /> Screenshot Provided
                                    </dd>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Output Data / Result */}
                    <div className="pt-4">
                        <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                            {mode === "lab" ? <Bot className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                            {mode === "lab" ? "Tactical Synthesis" : "Executive Briefing"}
                        </h2>

                        {status === "failed" ? (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-3xl">
                                <AlertCircle className="w-6 h-6 mb-3" />
                                <h3 className="font-bold text-lg mb-1">Execution Failed</h3>
                                <p className="text-sm text-white/70">{errorMessage || "Unknown error occurred during processing."}</p>
                            </div>
                        ) : status === "pending" || status === "processing" ? (
                            <div className="bg-[#0B0E14] border border-white/5 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
                                <h3 className="font-bold text-lg text-white mb-2">Processing Execution</h3>
                                <p className="text-sm text-gray-500 max-w-sm">This execution is still in progress. The results will appear here once analysis is complete.</p>
                            </div>
                        ) : outputData ? (
                            <ToolResultCard result={outputData} />
                        ) : (
                            <div className="bg-[#0B0E14] border border-white/5 p-12 rounded-3xl flex flex-col items-center justify-center text-center">
                                <AlertCircle className="w-8 h-8 text-yellow-500 mb-4 opacity-50" />
                                <h3 className="font-bold text-lg text-white mb-2">No Results Found</h3>
                                <p className="text-sm text-gray-500 max-w-sm">This execution completed but returned no structured output data.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
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
        success: { icon: CheckCircle2, color: "text-emerald-400", label: "Success", bg: "bg-emerald-400/10 border-emerald-400/20" },
        failed: { icon: AlertCircle, color: "text-red-400", label: "Failed", bg: "bg-red-400/10 border-red-400/20" },
    };

    const c = config[status];
    if (!c) return null;
    const Icon = c.icon;

    return (
        <span className={cn("flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border", c.color, c.bg)}>
            <Icon className={cn("w-4 h-4", status === "processing" && "animate-spin")} />
            {c.label}
        </span>
    );
}
