"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

export function AuthForms() {
    const [mode, setMode] = useState<"login" | "signup">("login");

    const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

    return (
        <div className="w-full max-w-md space-y-8 p-8 relative">
            <div className="absolute -top-24 -left-20 w-64 h-64 bg-[#00FF41]/5 rounded-full blur-[100px] pointer-events-none" />

            <header className="space-y-2 relative z-10">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <img src="/xManager_Logo.png" alt="Logo" className="w-32 h-32 object-contain" />
                    <span className="text-2xl font-heading font-black tracking-[-0.05em] text-white uppercase italic">
                        FC <span className="lowercase">x</span><span className="text-[#00FF41]">Manager</span>
                    </span>
                </motion.div>

                <h2 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">
                    {mode === "login" ? "Welcome Back" : "Enlist Now"}
                </h2>
                <p className="text-gray-400 font-medium">
                    {mode === "login"
                        ? "Enter your credentials to access the boardroom."
                        : "Create your managerial profile and start your legacy."
                    }
                </p>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 relative z-10"
                >
                    <div className="space-y-4">
                        {mode === "signup" && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00FF41] transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="Alex Ferguson"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF41]/50 focus:bg-white/[0.08] transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00FF41] transition-colors" />
                                <input
                                    type="email"
                                    placeholder="manager@fcx.ai"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF41]/50 focus:bg-white/[0.08] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
                                {mode === "login" && (
                                    <button className="text-[10px] font-black uppercase tracking-widest text-[#00FF41] hover:underline">Forgot?</button>
                                )}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#00FF41] transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#00FF41]/50 focus:bg-white/[0.08] transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <ShimmerButton
                        className="w-full h-14 text-sm font-black uppercase tracking-widest text-[#0B0E14]"
                        background="#00FF41"
                        shimmerColor="#ffffff"
                    >
                        {mode === "login" ? "Authorize Access" : "Initialize Profile"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </ShimmerButton>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                            <span className="bg-[#0B0E14] px-4 text-gray-600">Or continue with</span>
                        </div>
                    </div>

                    <button className="w-full h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all font-black text-xs uppercase tracking-widest text-white">
                        <Github className="w-5 h-5" />
                        Github Organization
                    </button>
                </motion.div>
            </AnimatePresence>

            <footer className="text-center relative z-10">
                <button
                    onClick={toggleMode}
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                    {mode === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "
                    }
                    <span className="text-[#00FF41] font-black uppercase tracking-widest ml-1">
                        {mode === "login" ? "Sign Up" : "Login"}
                    </span>
                </button>
            </footer>
        </div>
    );
}
