"use client";

import { motion } from "framer-motion";

export function BoardroomAvatar() {
    return (
        <div className="relative w-72 h-72 md:w-96 md:h-96 group">
            {/* Ambient Glow */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-[#EAB308]/10 rounded-full blur-[100px] group-hover:bg-[#EAB308]/20 transition-colors duration-1000" />

            {/* The Manager */}
            <motion.div
                className="relative w-full h-full z-10 flex items-center justify-center p-4"
                whileHover={{
                    scale: 1.05,
                }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <img
                    src="/boardroom-manager.png"
                    alt="Boardroom Manager"
                    className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(234,179,8,0.2)] transition-all duration-700 -ml-4"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }}
                />
            </motion.div>

            {/* Subtle atmospheric scan line */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#EAB308]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-full overflow-hidden">
                <motion.div
                    className="w-full h-[2px] bg-[#EAB308]/20"
                    animate={{
                        top: ["0%", "100%"]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </div>
    );
}
