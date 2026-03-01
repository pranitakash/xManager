"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogOut, Clock } from "lucide-react";

type Mode = "lab" | "boardroom";

interface AgentNavbarProps {
    mode: Mode;
    onModeChange: (mode: Mode) => void;
}

export function AgentNavbar({ mode, onModeChange }: AgentNavbarProps) {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "xm_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        router.push("/auth");
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 px-8 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto"
            >
                {/* Logo Capsule */}
                <div className="flex-1 flex justify-start">
                    <div className="bg-[#0B0E14]/40 backdrop-blur-2xl border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <a href="/" className="flex items-center gap-2">
                            <img src="/xManager_Logo.png" alt="FC xManager Logo" className="w-12 h-12 object-contain" />
                            <span className="text-[14px] font-heading font-black tracking-[-0.05em] text-white uppercase italic">
                                FC <span className="lowercase">x</span><span className="text-[#00FF41]">M</span><span className="hidden lg:inline text-white/40">anager</span>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Mode Switcher Capsule */}
                <div className="flex-none">
                    <div className="bg-[#0B0E14]/40 backdrop-blur-2xl border border-white/5 p-1 rounded-2xl flex items-center gap-0.5 shadow-2xl">
                        <button
                            onClick={() => onModeChange("lab")}
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
                            Lab
                        </button>
                        <button
                            onClick={() => onModeChange("boardroom")}
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

                {/* Logout Capsule */}
                <div className="flex-1 flex justify-end gap-3">
                    <button
                        onClick={() => router.push("/history")}
                        className="bg-[#0B0E14]/40 backdrop-blur-2xl border border-white/5 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl text-gray-500 hover:text-white transition-all duration-300 group"
                    >
                        <Clock className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">History</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-[#0B0E14]/40 backdrop-blur-2xl border border-white/5 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl text-gray-500 hover:text-red-400 hover:border-red-500/20 transition-all duration-300 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Exit</span>
                    </button>
                </div>
            </motion.nav>
        </div>
    );
}
