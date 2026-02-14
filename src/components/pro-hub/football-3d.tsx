"use client";

import { motion } from "framer-motion";

export function Football3D() {
    return (
        <div className="relative w-40 h-40 md:w-56 md:h-56 group">
            {/* Premium Green Glow Base */}
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[60px] animate-pulse" />

            {/* The Football */}
            <motion.div
                className="relative z-10 w-full h-full flex items-center justify-center -mt-8"
                initial={{ rotate: 15 }}
                animate={{
                    y: [0, -10, 0],
                    rotate: [15, 12, 15]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <img
                    src="/premium-football.png"
                    alt="xManager Football"
                    className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,255,65,0.25)] rounded-full"
                />
            </motion.div>

            {/* Decorative Ring */}
            <div className="absolute inset-[-20px] border border-foreground/5 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>
    );
}
