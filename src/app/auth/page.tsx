"use client";

import { InteractiveSide } from "@/components/auth/interactive-side";
import { AuthForms } from "@/components/auth/auth-forms";
import { motion } from "framer-motion";

export default function AuthPage() {
    return (
        <main className="min-h-screen w-full flex flex-col md:flex-row bg-[#0B0E14]">
            {/* Left Side: Animations */}
            <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden md:flex w-1/2 h-screen fixed left-0 top-0 border-r border-white/5"
            >
                <InteractiveSide />
            </motion.section>

            {/* Empty space for the fixed side on desktop */}
            <div className="hidden md:block w-1/2 mr-auto" />

            {/* Right Side: Forms */}
            <section className="w-full md:w-1/2 min-h-screen flex items-center justify-center overflow-y-auto py-12 px-6">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full flex justify-center"
                >
                    <AuthForms />
                </motion.div>
            </section>

            {/* Mobile View: Small interactive banner at top */}
            <div className="md:hidden fixed top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-[#00FF41] to-[#D4AF37]" />
        </main>
    );
}
