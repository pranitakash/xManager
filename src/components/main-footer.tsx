"use client";

import { Zap, Github, Twitter, MessageSquare, ShieldCheck } from "lucide-react";

export function MainFooter() {
    return (
        <footer className="bg-[#0B0E14] border-t border-white/5 pt-32 pb-16 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
                    <div className="space-y-12">
                        <a href="/" className="flex items-start gap-4">
                            <img src="/xManager_Logo.png" alt="FC xManager Logo" className="w-20 h-20 object-contain" />
                            <div className="space-y-6">
                                <span className="text-2xl font-heading font-black tracking-[-0.05em] text-white uppercase italic">
                                    FC <span className="lowercase">x</span><span className="text-[#00FF41]">Manager</span>
                                </span>
                                <p className="text-gray-600 text-xs font-medium leading-relaxed uppercase tracking-widest">
                                    The ultimate sidekick for elite FC 25 players. Stop bottling the Weekend League and start building your dynasty with the most relatable AI in the game.
                                </p>
                            </div>
                        </a>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                                <Github className="w-5 h-5 text-white" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                                <Twitter className="w-5 h-5 text-white" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-12">Operational</h4>
                        <ul className="space-y-5">
                            {['Investment Whale', 'Transfer Scout', 'SBC Solutionist', 'Evo Optimizer', 'Tactics Sim'].map(item => (
                                <li key={item}><a href="#" className="text-gray-600 hover:text-[#00FF41] transition-colors font-black text-xs uppercase tracking-widest">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-12">Infrastructure</h4>
                        <ul className="space-y-5">
                            {['Technical Docs', 'Model Architecture', 'Consensus Logs', 'System Status', 'Neural Ethics'].map(item => (
                                <li key={item}><a href="#" className="text-gray-600 hover:text-[#00FF41] transition-colors font-black text-xs uppercase tracking-widest">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-12">Compliance</h4>
                        <ul className="space-y-5">
                            {['Privacy Protocol', 'Service Terms', 'Policy Matrix', 'Data Security', 'Fair Usage'].map(item => (
                                <li key={item}><a href="#" className="text-gray-600 hover:text-[#00FF41] transition-colors font-black text-xs uppercase tracking-widest">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:row justify-between items-center pt-16 border-t border-white/5 gap-8">
                    <p className="text-[10px] font-black font-mono text-gray-700 uppercase tracking-[0.5em]">
                        © 2024 xManager PROTOCOL. v1.4.2-LATEST
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-black font-mono text-gray-700 uppercase tracking-[0.5em]">
                        <ShieldCheck className="w-4 h-4 text-[#00FF41]" />
                        ENCRYPTED BY NEURAL SYNC
                    </div>
                </div>
            </div>
        </footer>
    );
}
