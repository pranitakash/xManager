"use client";

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    User,
    AlertCircle,
    Clock,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { AgentNavbar } from "@/components/agent/agent-navbar";
import { AgentSidebar } from "@/components/agent/agent-sidebar";
import { ToolInputForm } from "@/components/agent/tool-input-form";
import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";
import { TOOL_INPUT_CONFIGS } from "@/lib/tool-input-config";
import {
    executeTool,
    waitForCompletion,
    ToolExecutionError,
    type ExecutionResponse
} from "@/lib/api-client";

type Mode = "lab" | "boardroom";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    toolId?: string;
    status?: "pending" | "processing" | "success" | "failed";
    executionId?: string;
    result?: Record<string, unknown> | null;
    executionTimeMs?: number | null;
}

function AgentContent() {
    const searchParams = useSearchParams();
    const initialMode = (searchParams.get("mode") as Mode) || "lab";

    const [mode, setMode] = useState<Mode>(initialMode);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: initialMode === "lab"
                ? "Tactical synthesis initialized. Select a tool from the sidebar to configure your analysis parameters."
                : "Executive briefing ready. Select a boardroom tool to configure your strategic analysis.",
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [activeFeature, setActiveFeature] = useState<string | null>(null);
    const [activeTool, setActiveTool] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(true);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Reset tool when mode changes
    useEffect(() => {
        setActiveFeature(null);
        setActiveTool(null);
        setShowForm(true);
        setMessages([{
            id: Date.now().toString(),
            role: "assistant",
            content: mode === "lab"
                ? "Tactical synthesis initialized. Select a tool from the sidebar to configure your analysis parameters."
                : "Executive briefing ready. Select a boardroom tool to configure your strategic analysis.",
            timestamp: new Date()
        }]);
    }, [mode]);

    // ─── Execute Tool with Structured Data ────────────────
    const handleToolExecution = useCallback(async (
        toolId: string,
        inputData: Record<string, unknown>,
        image?: { base64: string; mimeType: string }
    ) => {
        const toolConfig = TOOL_INPUT_CONFIGS[toolId];
        const displayName = toolConfig?.displayName || toolId.replace(/-/g, " ");

        // Build a readable summary of the user's inputs
        const summaryParts: string[] = [`🔧 ${displayName.toUpperCase()}`];
        for (const [key, value] of Object.entries(inputData)) {
            if (value && key !== "image") {
                const label = key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).trim();
                const display = Array.isArray(value) ? value.join(", ") : String(value);
                if (display.length > 0) {
                    summaryParts.push(`${label}: ${display.length > 80 ? display.slice(0, 80) + "..." : display}`);
                }
            }
        }
        if (image) summaryParts.push("📷 Screenshot attached");

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: summaryParts.join("\n"),
            timestamp: new Date(),
            toolId,
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Add placeholder assistant message
        const placeholderId = (Date.now() + 1).toString();
        const placeholderMsg: Message = {
            id: placeholderId,
            role: "assistant",
            content: "Processing your request...",
            timestamp: new Date(),
            toolId,
            status: "pending",
        };
        setMessages(prev => [...prev, placeholderMsg]);

        try {
            // Merge image into inputData if present
            const finalInput = image
                ? { ...inputData, image: { base64: image.base64, mimeType: image.mimeType } }
                : inputData;

            const response = await executeTool({
                mode,
                tool: toolId,
                inputData: finalInput,
            });

            let finalResult: ExecutionResponse = response;

            // If async (202), poll for completion
            if (response.status === "pending" || response.status === "processing") {
                setMessages(prev =>
                    prev.map(m =>
                        m.id === placeholderId
                            ? { ...m, content: "Processing in background...", status: "processing", executionId: response.executionId }
                            : m
                    )
                );

                finalResult = await waitForCompletion(
                    response.executionId,
                    (status) => {
                        setMessages(prev =>
                            prev.map(m =>
                                m.id === placeholderId
                                    ? { ...m, content: `Status: ${status}...`, status: status as Message["status"] }
                                    : m
                            )
                        );
                    }
                );
            }

            // Update placeholder with final result
            setMessages(prev =>
                prev.map(m =>
                    m.id === placeholderId
                        ? {
                            ...m,
                            content: formatResponse(finalResult),
                            status: finalResult.status as Message["status"],
                            result: finalResult.result,
                            executionTimeMs: finalResult.executionTimeMs,
                            executionId: finalResult.executionId,
                        }
                        : m
                )
            );
        } catch (error) {
            const errorMessage = error instanceof ToolExecutionError
                ? `${error.message} (${error.code})`
                : "An unexpected error occurred. Please try again.";

            setMessages(prev =>
                prev.map(m =>
                    m.id === placeholderId
                        ? { ...m, content: errorMessage, status: "failed" }
                        : m
                )
            );
        } finally {
            setIsTyping(false);
        }
    }, [mode]);

    // ─── Sidebar Click → Activate Tool (show form) ────────
    const handleFeatureClick = useCallback((toolId: string) => {
        setActiveFeature(toolId);
        setActiveTool(toolId);
        setShowForm(true);

        // Add a system message indicating tool selection
        const toolConfig = TOOL_INPUT_CONFIGS[toolId];
        if (toolConfig) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: "assistant",
                content: `🛠️ ${toolConfig.displayName} activated. Fill in the parameters below and click Execute.${toolConfig.supportsImage ? " You can also upload a screenshot for AI analysis." : ""}`,
                timestamp: new Date(),
            }]);
        }
    }, []);

    // ─── Form Submit Handler ──────────────────────────────
    const handleFormSubmit = useCallback((data: Record<string, unknown>, image?: { base64: string; mimeType: string; name: string; size: number; preview: string }) => {
        if (!activeTool) return;

        setShowForm(false);

        const imageData = image
            ? { base64: image.base64, mimeType: image.mimeType }
            : undefined;

        handleToolExecution(activeTool, data, imageData);
    }, [activeTool, handleToolExecution]);

    // Get the active tool's config
    const activeToolConfig = activeTool ? TOOL_INPUT_CONFIGS[activeTool] : null;

    return (
        <main className="h-screen bg-[#0B0E14] text-white selection:bg-white/10 flex flex-col overflow-hidden relative">
            <AgentNavbar mode={mode} onModeChange={setMode} />
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

            <AgentSidebar mode={mode} onFeatureClick={handleFeatureClick} activeFeature={activeFeature} />

            {/* Chat Area — offset for sidebar */}
            <div
                ref={scrollRef}
                className={cn(
                    "flex-1 overflow-y-auto pt-28 px-6 scrollbar-hide flex flex-col items-center ml-20",
                    activeToolConfig && showForm ? "pb-8" : "pb-32"
                )}
            >
                <div className="w-full max-w-3xl space-y-10">
                    <AnimatePresence mode="popLayout">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={cn(
                                    "flex flex-col gap-3",
                                    msg.role === "user" ? "items-end" : "items-start"
                                )}
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    {msg.role === "assistant" ? (
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center border",
                                            mode === "lab" ? "bg-[#00FF41]/10 border-[#00FF41]/20 text-[#00FF41]" : "bg-[#EAB308]/10 border-[#EAB308]/20 text-[#EAB308]"
                                        )}>
                                            <Bot className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-600">
                                        {msg.role === "assistant" ? "xManager Intelligence" : "Director"}
                                    </span>
                                    {msg.role === "assistant" && msg.status && (
                                        <StatusBadge status={msg.status} executionTimeMs={msg.executionTimeMs} />
                                    )}
                                </div>
                                <div className={cn(
                                    "max-w-[85%] p-6 rounded-3xl text-sm font-medium leading-relaxed",
                                    msg.role === "user"
                                        ? "bg-white/5 border border-white/10 text-white rounded-tr-none"
                                        : "bg-[#0B0E14] border border-white/5 text-gray-300 rounded-tl-none shadow-xl"
                                )}>
                                    {msg.status === "pending" || msg.status === "processing" ? (
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                                            <span className="text-gray-500">{msg.content}</span>
                                        </div>
                                    ) : (
                                        <div className="whitespace-pre-wrap">{msg.content}</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTyping && !messages.some(m => m.status === "pending" || m.status === "processing") && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-gray-600 ml-11"
                        >
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* ── Tool Input Form (replaces text bar when a tool is active) ── */}
            <div className="ml-20">
                <AnimatePresence mode="wait">
                    {activeToolConfig && showForm ? (
                        <ToolInputForm
                            key={activeTool}
                            config={activeToolConfig}
                            onSubmit={handleFormSubmit}
                            isLoading={isTyping}
                        />
                    ) : activeToolConfig && !showForm ? (
                        <motion.div
                            key="reopen-tool"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="fixed bottom-10 left-1/2 -translate-x-1/2 ml-10 z-50 flex gap-4"
                        >
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium backdrop-blur-xl shadow-2xl transition-all"
                            >
                                Reopen Parameters
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-tool"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="border-t border-white/5 bg-[#0B0E14]/95 backdrop-blur-lg px-6 py-5"
                        >
                            <div className="max-w-3xl mx-auto text-center">
                                <p className="text-sm text-gray-600">
                                    ← Select a tool from the sidebar to begin structured analysis
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}


// ─── Status Badge Component ─────────────────────────────
function StatusBadge({ status, executionTimeMs }: { status: string; executionTimeMs?: number | null }) {
    const config: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; label: string }> = {
        pending: { icon: Clock, color: "text-yellow-500", label: "Queued" },
        processing: { icon: Loader2, color: "text-blue-400", label: "Processing" },
        success: { icon: CheckCircle2, color: "text-emerald-400", label: executionTimeMs ? `${(executionTimeMs / 1000).toFixed(1)}s` : "Done" },
        failed: { icon: AlertCircle, color: "text-red-400", label: "Failed" },
    };

    const c = config[status];
    if (!c) return null;
    const Icon = c.icon;

    return (
        <span className={cn("flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest", c.color)}>
            <Icon className={cn("w-3 h-3", status === "processing" && "animate-spin")} />
            {c.label}
        </span>
    );
}


// ─── Format Response for Display ────────────────────────
function formatResponse(response: ExecutionResponse): string {
    if (response.status === "failed") {
        return `❌ Analysis failed: ${response.error || "Unknown error"}. Please try again.`;
    }

    if (!response.result) {
        return "No results returned.";
    }

    const result = response.result;
    const sections: string[] = [];

    // Primary analysis
    if (result.analysis && typeof result.analysis === "string") {
        sections.push(`📊 ANALYSIS\n${result.analysis}`);
    }

    // Primary recommendation
    if (result.primaryRecommendation && typeof result.primaryRecommendation === "string") {
        sections.push(`⭐ RECOMMENDATION\n${result.primaryRecommendation}`);
    }

    // Supporting data
    if (Array.isArray(result.supportingData) && result.supportingData.length > 0) {
        const dataLines = result.supportingData.map((item: Record<string, unknown>, i: number) => {
            const entries = Object.entries(item)
                .filter(([, v]) => typeof v === "string" || typeof v === "number")
                .map(([k, v]) => `  ${formatKey(k)}: ${v}`)
                .join("\n");
            return `${i + 1}.\n${entries}`;
        });
        sections.push(`📋 DATA\n${dataLines.join("\n\n")}`);
    }

    // Risk factors
    if (Array.isArray(result.riskFactors) && result.riskFactors.length > 0) {
        sections.push(`⚠️ RISK FACTORS\n${(result.riskFactors as string[]).map((r: string) => `• ${r}`).join("\n")}`);
    }

    // Alternatives
    if (Array.isArray(result.alternatives) && result.alternatives.length > 0) {
        sections.push(`🔄 ALTERNATIVES\n${(result.alternatives as string[]).map((a: string) => `• ${a}`).join("\n")}`);
    }

    // Any remaining top-level string/number fields
    const handled = new Set(["analysis", "primaryRecommendation", "supportingData", "riskFactors", "alternatives"]);
    for (const [key, value] of Object.entries(result)) {
        if (handled.has(key)) continue;
        if (typeof value === "string" && value.length > 0) {
            sections.push(`📌 ${formatKey(key).toUpperCase()}\n${value}`);
        } else if (typeof value === "number") {
            sections.push(`📌 ${formatKey(key).toUpperCase()}: ${value}`);
        } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            // Render nested objects
            const nestedEntries = Object.entries(value)
                .filter(([, v]) => typeof v === "string" || typeof v === "number")
                .map(([k, v]) => `  ${formatKey(k)}: ${v}`)
                .join("\n");
            if (nestedEntries) {
                sections.push(`📌 ${formatKey(key).toUpperCase()}\n${nestedEntries}`);
            }
        }
    }

    return sections.join("\n\n") || "Analysis complete. No detailed output available.";
}

function formatKey(key: string): string {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).trim();
}


export default function AgentPage() {
    return (
        <Suspense fallback={<div className="h-screen bg-[#0B0E14] flex items-center justify-center text-white"><span className="text-gray-500 font-medium tracking-wider">Initializing Tactical Systems...</span></div>}>
            <AgentContent />
        </Suspense>
    );
}
