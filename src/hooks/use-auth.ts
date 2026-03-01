"use client";

import { useState, useEffect } from "react";

export function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            // Simple check if the "xm_auth" cookie exists
            const hasAuthCookie = document.cookie.split(';').some((item) => item.trim().startsWith('xm_auth='));
            setIsLoggedIn(hasAuthCookie);
            setIsLoading(false);
        };

        checkAuth();

        // Listen for visibility changes (e.g., coming back to tab after logging in elsewhere)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                checkAuth();
            }
        };

        // Listen for custom events if we emit them later on login/logout
        const handleAuthChange = () => checkAuth();

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('xm_auth_change', handleAuthChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('xm_auth_change', handleAuthChange);
        };
    }, []);

    const logout = () => {
        document.cookie = "xm_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setIsLoggedIn(false);
        // Dispatch custom event to let other instances of the hook know
        window.dispatchEvent(new Event("xm_auth_change"));
        window.location.href = "/";
    };

    return { isLoggedIn, isLoading, logout };
}
