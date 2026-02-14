"use client";

import { Zap, Github, Twitter, MessageSquare, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { InfoModal } from "./info-modal";

export function MainFooter() {
    const [selectedInfo, setSelectedInfo] = useState<{ title: string; content: React.ReactNode } | null>(null);

    const infoContent: Record<string, React.ReactNode> = {
        'Technical Docs': (
            <div className="space-y-10">
                <p>The xManager platform is built on a distributed microservices architecture designed for real-time tactical processing and sub-100ms market data synchronization.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <h4 className="text-[#00FF41] font-black uppercase text-sm mb-4 tracking-widest">Engine Core</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">Processes over 100,000 match data points per second. Our proprietary algorithms analyze player positioning, momentum shifts, and tactical efficiency in real-time.</p>
                    </div>
                    <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <h4 className="text-[#00FF41] font-black uppercase text-sm mb-4 tracking-widest">Scalability</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">Horizontal scaling via Kubernetes ensures 99.99% uptime even during peak Weekend League traffic spikes.</p>
                    </div>
                </div>
            </div>
        ),
        'Model Architecture': (
            <div className="space-y-10">
                <p>Our intelligence model leverages a multi-layer analysis system optimized for sporting predictive modeling and economic forecasting.</p>
                <div className="space-y-6">
                    <div className="flex items-start gap-6 p-6 border-l-2 border-primary/30 bg-white/[0.02]">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[#00FF41] font-bold text-xs">01</div>
                        <div>
                            <h5 className="text-white font-black uppercase text-xs mb-2">Tactical Synthesis</h5>
                            <p className="text-gray-500 text-sm">Heuristic modeling for custom tactics and formation instruction efficiency.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 border-l-2 border-primary/30 bg-white/[0.02]">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[#00FF41] font-bold text-xs">02</div>
                        <div>
                            <h5 className="text-white font-black uppercase text-xs mb-2">Market Pulse</h5>
                            <p className="text-gray-500 text-sm">Random Forest regressors analyze historical price action and supply/demand trends.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-6 p-6 border-l-2 border-primary/30 bg-white/[0.02]">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[#00FF41] font-bold text-xs">03</div>
                        <div>
                            <h5 className="text-white font-black uppercase text-xs mb-2">Career Logic</h5>
                            <p className="text-gray-500 text-sm">Procedural storyline generation and realistic board evaluation metrics.</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        'Consensus Logs': (
            <div className="space-y-10">
                <p>Public ledger of intelligence audits and meta-verification cycles.</p>
                <div className="bg-black/50 p-8 rounded-3xl font-mono text-xs border border-white/5 space-y-3">
                    <div className="flex justify-between border-b border-white/5 pb-2 mb-4">
                        <span className="text-gray-500">TIMESTAMP: 2026-02-12 00:34:12</span>
                        <span className="text-[#00FF41]">[STABLE]</span>
                    </div>
                    <div className="text-white">SCAN: Analyzing top 10,000 Weekend League matches...</div>
                    <div className="text-[#00FF41]">{" > "} Meta Consensus Reached: 4-3-2-1 Dominance Confirmed</div>
                    <div className="text-white">SCAN: Player cards price history synchronization...</div>
                    <div className="text-[#00FF41]">{" > "} Market Trend: Liquidity shift captured in Elite Icons</div>
                    <div className="text-white">SCAN: Boardroom logic verification...</div>
                    <div className="text-[#D4AF37]">{" > "} Career Realism Index: 98.2% Accuracy</div>
                </div>
            </div>
        ),
        'System Status': (
            <div className="space-y-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'API Endpoints', status: 'Operational', color: '#00FF41' },
                        { label: 'Market Sync', status: 'Operational', color: '#00FF41' },
                        { label: 'Tactical Engine', status: 'Operational', color: '#00FF41' },
                        { label: 'Database', status: 'Operational', color: '#00FF41' },
                    ].map(item => (
                        <div key={item.label} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
                            <div className="w-2 h-2 rounded-full mx-auto mb-4 animate-pulse" style={{ backgroundColor: item.color }} />
                            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
                            <div className="text-xs font-bold text-white uppercase">{item.status}</div>
                        </div>
                    ))}
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                    <h4 className="text-white font-black uppercase text-xs mb-4 tracking-widest">Recent Maintenance</h4>
                    <p className="text-gray-400 text-sm">No significant downtime recorded in the last 30 days. Next scheduled cache optimization on Feb 15, 02:00 UTC.</p>
                </div>
            </div>
        ),
        'Privacy Protocol': (
            <div className="space-y-10">
                <p className="text-lg">Your data is your competitive edge. We treat it with institutional-grade security.</p>
                <div className="space-y-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <h4 className="text-white font-black uppercase text-xs mb-2">No Leak Clause</h4>
                        <p className="text-gray-500 text-sm">Your custom tactics and squad files are encrypted. xManager staff cannot access your specific tactical setups.</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <h4 className="text-white font-black uppercase text-xs mb-2">Account Safety</h4>
                        <p className="text-gray-500 text-sm">We use read-only verification methods where possible to ensure your club credentials remain untouched.</p>
                    </div>
                </div>
            </div>
        ),
        'Service Terms': (
            <div className="space-y-10">
                <p>By accessing the xManager platforms, you agree to our professional usage guidelines.</p>
                <div className="space-y-4 text-gray-400 text-sm">
                    <p>1. <strong>Platform Access:</strong> Licenses are granted to individual managers. Account sharing is monitored and may trigger lockout protocols.</p>
                    <p>2. <strong>Data Usage:</strong> You retain ownership of your club data. We aggregate non-identifiable data to improve global meta insights.</p>
                    <p>3. <strong>Prohibited Actions:</strong> Reverse engineering the tactical engine or automating market actions beyond platform tools is strictly forbidden.</p>
                </div>
            </div>
        ),
        'Policy Matrix': (
            <div className="space-y-10">
                <div className="border border-white/10 rounded-3xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-6 font-black uppercase tracking-widest text-[10px]">Tier</th>
                                <th className="p-6 font-black uppercase tracking-widest text-[10px]">Access Level</th>
                                <th className="p-6 font-black uppercase tracking-widest text-[10px]">Limits</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <tr>
                                <td className="p-6 font-bold">Base</td>
                                <td className="p-6 text-gray-500">Standard Dashboards</td>
                                <td className="p-6 text-gray-500">5 Syncs/Day</td>
                            </tr>
                            <tr>
                                <td className="p-6 font-bold text-[#00FF41]">Elite</td>
                                <td className="p-6 text-gray-400">Full Intelligence Suite</td>
                                <td className="p-6 text-gray-400">Unlimited</td>
                            </tr>
                            <tr>
                                <td className="p-6 font-bold text-[#D4AF37]">Partner</td>
                                <td className="p-6 text-gray-400">API Access + Neural Priority</td>
                                <td className="p-6 text-gray-400">Unlimited</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        ),
        'Data Security': (
            <div className="space-y-10">
                <div className="flex flex-col items-center py-10">
                    <ShieldCheck className="w-20 h-20 text-[#00FF41] mb-6 opacity-30" />
                    <h3 className="text-2xl font-black uppercase mb-4">Institutional Security</h3>
                    <p className="text-center text-gray-400 max-w-lg">Advanced encryption standards (AES-256) protect all transmitted packets. Our infrastructure undergoes weekly security audits to ensure zero vulnerability.</p>
                </div>
            </div>
        ),
        'Fair Usage': (
            <div className="space-y-10">
                <p>xManager is designed to assist, not dominate. We believe in the integrity of competitive play.</p>
                <div className="p-10 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-3xl italic text-[#00FF41] font-medium text-center">
                    "Intelligence is an advantage, not a replacement for skill. We ensure our tools bridge the gap between effort and results without breaking the spirit of the game."
                </div>
            </div>
        )
    };

    const handleOpen = (item: string) => {
        setSelectedInfo({
            title: item,
            content: infoContent[item] || (
                <div className="py-20 text-center">
                    <p className="text-gray-500 font-mono tracking-widest uppercase">Content for {item} is being synchronized from neural cores...</p>
                </div>
            )
        });
    };
    return (
        <footer className="bg-background border-t border-foreground/5 pt-32 pb-16 px-6 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
                    <div className="space-y-12">
                        <a href="/" className="flex items-start gap-4">
                            <img src="/xManager_Logo.png" alt="FC xManager Logo" className="w-20 h-20 object-contain" />
                            <div className="space-y-6">
                                <span className="text-2xl font-heading font-black tracking-[-0.05em] text-foreground uppercase italic">
                                    FC <span className="lowercase">x</span><span className="text-primary">Manager</span>
                                </span>
                                <p className="text-muted-foreground/60 text-xs font-medium leading-relaxed uppercase tracking-widest transition-colors duration-500">
                                    The ultimate sidekick for elite FC 25 players. Stop bottling the Weekend League and start building your dynasty with the most relatable AI in the game.
                                </p>
                            </div>
                        </a>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border-foreground/10">
                                <Github className="w-5 h-5 text-white" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border-foreground/10">
                                <Twitter className="w-5 h-5 text-white" />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border-foreground/10">
                                <MessageSquare className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black uppercase tracking-[0.4em] text-[10px] mb-12">Operational</h4>
                        <ul className="space-y-5">
                            {['Investment Whale', 'Transfer Scout', 'SBC Solutionist', 'Evo Optimizer', 'Tactics Sim'].map(item => (
                                <li key={item}><a href="#" className="text-gray-600 hover:text-[#00FF41] transition-colors font-black text-xs uppercase tracking-widest">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black uppercase tracking-[0.4em] text-[10px] mb-12">Infrastructure</h4>
                        <ul className="space-y-5">
                            {['Technical Docs', 'Model Architecture', 'Consensus Logs', 'System Status', 'Neural Ethics'].map(item => (
                                <li key={item}>
                                    <button
                                        onClick={() => handleOpen(item)}
                                        className="text-gray-600 hover:text-[#00FF41] transition-colors font-black text-xs uppercase tracking-widest text-left"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-foreground font-black uppercase tracking-[0.4em] text-[10px] mb-12">Compliance</h4>
                        <ul className="space-y-5">
                            {['Privacy Protocol', 'Service Terms', 'Policy Matrix', 'Data Security', 'Fair Usage'].map(item => (
                                <li key={item}>
                                    <button
                                        onClick={() => handleOpen(item)}
                                        className="text-gray-600 hover:text-[#00FF41] transition-colors font-black text-xs uppercase tracking-widest text-left"
                                    >
                                        {item}
                                    </button>
                                </li>
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

            <InfoModal
                isOpen={!!selectedInfo}
                onClose={() => setSelectedInfo(null)}
                title={selectedInfo?.title || ""}
                content={selectedInfo?.content}
            />
        </footer>
    );
}
