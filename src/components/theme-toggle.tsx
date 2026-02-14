"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-14 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
                "group relative w-14 h-8 rounded-full p-1 transition-all duration-500",
                "bg-zinc-200 dark:bg-zinc-800",
                "border border-black/5 dark:border-white/10 shadow-inner",
                "pointer-events-auto cursor-pointer"
            )}
            aria-label="Toggle theme"
        >
            <motion.div
                className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full shadow-lg transition-colors duration-500",
                    "bg-white dark:bg-zinc-900"
                )}
                animate={{ x: theme === "dark" ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {theme === "dark" ? (
                        <motion.div
                            key="moon"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Moon className="w-3.5 h-3.5 text-zinc-100 fill-zinc-100" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sun"
                            initial={{ scale: 0, rotate: 90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Sun className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </button>
    );
}
