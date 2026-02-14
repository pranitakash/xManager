"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, Database } from "lucide-react";

export function TechFooter() {
    return (
        <footer className="bg-[#0B0E14] border-t border-white/5 py-12 px-4 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
                        <span className="lowercase">x</span><span className="text-[#00FF41]">Manager</span>
                    </h3>
                    <p className="text-gray-500 max-w-sm mb-8">
                        Engineered for elite performance. Our platform leverages sparse attention mechanisms and token-efficient solvers to provide real-time football intelligence.
                    </p>

                    {/* Token Efficiency Visualizer */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Token Efficiency</span>
                            <span className="text-xs font-mono text-[#00FF41]">99.2% OPTIMIZED</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-[#00FF41] rounded-full"
                                initial={{ width: "0%" }}
                                whileInView={{ width: "99.2%" }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">System Status</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li className="flex items-center gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                            Neural Engine: Online
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                            Market Indexer: Active
                        </li>
                        <li className="flex items-center gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                            SBC Runtime: 0.4ms
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">Infrastructure</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col gap-2">
                            <Database className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[10px] font-mono text-gray-500">2.4PB DATA</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex flex-col gap-2">
                            <Cpu className="w-4 h-4 text-[#00FF41]" />
                            <span className="text-[10px] font-mono text-gray-500">H100 CLUSTER</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
                <p className="text-xs text-gray-600 font-mono">
                    © 2024 xManager PROTOCOL. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-8">
                    <a href="#" className="text-xs text-gray-600 font-mono hover:text-white transition-colors">PRIVACY_POLICY</a>
                    <a href="#" className="text-xs text-gray-600 font-mono hover:text-white transition-colors">API_DOCS</a>
                    <a href="#" className="text-xs text-gray-600 font-mono hover:text-white transition-colors">CHANGELOG</a>
                </div>
            </div>

            {/* Subtle Background Glow */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00FF41]/5 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
        </footer>
    );
}
