"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: React.ReactNode;
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/40 backdrop-blur-3xl"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        className="relative w-full max-w-5xl max-h-[85vh] bg-background/80 backdrop-blur-3xl border border-foreground/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-foreground/[0.05] before:to-transparent before:pointer-events-none"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-10 border-b border-foreground/5 relative z-10">
                            <div className="space-y-1">
                                <h2 className="text-4xl font-heading font-black text-foreground uppercase tracking-tighter italic">
                                    {title}
                                </h2>
                                <div className="h-1 w-12 bg-primary rounded-full" />
                            </div>
                            <button
                                onClick={onClose}
                                className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center hover:bg-foreground/10 transition-all text-foreground group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-10 md:p-14 scrollbar-hide relative z-10 transition-colors duration-500">
                            <div className="prose dark:prose-invert max-w-none prose-p:text-muted-foreground prose-p:text-lg prose-p:leading-relaxed prose-headings:text-foreground prose-headings:uppercase prose-headings:tracking-tighter">
                                {content}
                            </div>
                        </div>

                        {/* Minimal Footer */}
                        <div className="p-6 border-t border-foreground/5 bg-foreground/[0.02] flex justify-between items-center px-12 relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                                xManager Intelligence Engine
                            </span>
                            <div className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                <div className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
