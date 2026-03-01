"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload, X, Image as ImageIcon, Send, Loader2, FileImage, AlertCircle,
} from "lucide-react";
import type { ToolInputConfig, ToolField } from "@/lib/tool-input-config";

interface ImageData {
    base64: string;
    mimeType: string;
    name: string;
    size: number;
    preview: string;
}

interface ToolInputFormProps {
    config: ToolInputConfig;
    onSubmit: (data: Record<string, unknown>, image?: ImageData) => void;
    isLoading: boolean;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ToolInputForm({ config, onSubmit, isLoading }: ToolInputFormProps) {
    const [formData, setFormData] = useState<Record<string, string | number>>(() => {
        const initial: Record<string, string | number> = {};
        config.fields.forEach((f) => {
            if (f.defaultValue !== undefined) initial[f.name] = f.defaultValue;
        });
        return initial;
    });
    const [image, setImage] = useState<ImageData | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ─── Field Change ────────────────────────────────────
    const handleFieldChange = useCallback((name: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    // ─── Image Processing ────────────────────────────────
    const processFile = useCallback((file: File) => {
        setImageError(null);

        if (!ALLOWED_TYPES.includes(file.type)) {
            setImageError("Invalid file type. Use JPEG, PNG, WebP, or GIF.");
            return;
        }
        if (file.size > MAX_IMAGE_SIZE) {
            setImageError(`File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max 5MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            const base64 = dataUrl.split(",")[1];
            setImage({
                base64,
                mimeType: file.type,
                name: file.name,
                size: file.size,
                preview: dataUrl,
            });
        };
        reader.readAsDataURL(file);
    }, []);

    // ─── Drag & Drop ─────────────────────────────────────
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }, [processFile]);

    // ─── Submit ──────────────────────────────────────────
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Build clean data
        const data: Record<string, unknown> = {};
        for (const field of config.fields) {
            const val = formData[field.name];
            if (val !== undefined && val !== "" && val !== 0) {
                // Convert comma-separated strings to arrays for priority fields
                if (field.name === "priorityStats" || field.name === "targetRegions" ||
                    field.name === "priorityAttributes") {
                    data[field.name] = String(val).split(",").map((s) => s.trim()).filter(Boolean);
                } else if (field.type === "number") {
                    data[field.name] = Number(val);
                } else {
                    data[field.name] = val;
                }
            }
        }

        onSubmit(data, image ?? undefined);
    };

    // ─── Render Field ────────────────────────────────────
    const renderField = (field: ToolField) => {
        const value = formData[field.name] ?? "";

        const baseInputClass =
            "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white " +
            "placeholder:text-gray-600 focus:outline-none focus:border-[#00FF41]/40 focus:bg-white/[0.06] " +
            "transition-all duration-200";

        switch (field.type) {
            case "text":
                return (
                    <input
                        type="text"
                        value={String(value)}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={baseInputClass}
                    />
                );
            case "number":
                return (
                    <input
                        type="number"
                        value={value === "" ? "" : Number(value)}
                        onChange={(e) => handleFieldChange(field.name, e.target.value ? Number(e.target.value) : "")}
                        placeholder={field.placeholder}
                        min={field.min}
                        max={field.max}
                        required={field.required}
                        className={baseInputClass}
                    />
                );
            case "select":
                return (
                    <select
                        value={String(value)}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        className={baseInputClass + " appearance-none cursor-pointer"}
                    >
                        {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#0B0E14] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                );
            case "textarea":
                return (
                    <textarea
                        value={String(value)}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        rows={2}
                        className={baseInputClass + " resize-none"}
                    />
                );
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onSubmit={handleSubmit}
            className="border-t border-white/5 bg-[#0B0E14]/95 backdrop-blur-lg"
        >
            {/* ── Header ───────────────────────────────── */}
            <div className="px-4 pt-3 pb-2 border-b border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00FF41]">
                    {config.displayName}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">{config.description}</p>
            </div>

            {/* ── Scrollable form body ─────────────────── */}
            <div className="max-h-[45vh] overflow-y-auto px-4 py-3 space-y-3
                            scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

                {/* Fields grid — 2 cols for short fields, 1 col for textareas */}
                <div className="grid grid-cols-2 gap-3">
                    {config.fields.map((field) => (
                        <div
                            key={field.name}
                            className={field.type === "textarea" ? "col-span-2" : "col-span-1"}
                        >
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                                {field.label}
                                {field.required && <span className="text-[#00FF41] ml-0.5">*</span>}
                            </label>
                            {renderField(field)}
                        </div>
                    ))}
                </div>

                {/* Image upload zone */}
                {config.supportsImage && (
                    <div className="pt-2">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">
                            <FileImage className="inline w-3 h-3 mr-1 -mt-0.5" />
                            {config.imageLabel || "Screenshot"}{" "}
                            <span className="text-gray-600 font-normal normal-case tracking-normal">(optional)</span>
                        </label>

                        <AnimatePresence mode="wait">
                            {image ? (
                                /* ── Image Preview ── */
                                <motion.div
                                    key="preview"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="relative group rounded-lg overflow-hidden border border-white/10"
                                >
                                    <img
                                        src={image.preview}
                                        alt="Uploaded"
                                        className="w-full max-h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                    <div className="absolute bottom-1.5 left-2 text-[10px] text-gray-300">
                                        {image.name} · {(image.size / 1024).toFixed(0)}KB
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { setImage(null); setImageError(null); }}
                                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center
                                                   hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <X className="w-3.5 h-3.5 text-white" />
                                    </button>
                                </motion.div>
                            ) : (
                                /* ── Drop Zone ── */
                                <motion.div
                                    key="dropzone"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg border border-dashed cursor-pointer
                                        transition-all duration-200
                                        ${isDragging
                                            ? "border-[#00FF41]/50 bg-[#00FF41]/5"
                                            : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                                        }
                                    `}
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                                                     ${isDragging ? "bg-[#00FF41]/10" : "bg-white/5"}`}>
                                        {isDragging ? (
                                            <Upload className="w-4 h-4 text-[#00FF41]" />
                                        ) : (
                                            <ImageIcon className="w-4 h-4 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            {isDragging ? "Drop image here" : "Click to upload or drag & drop"}
                                        </p>
                                        <p className="text-[10px] text-gray-600 mt-0.5 truncate">
                                            {config.imagePlaceholder}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {imageError && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-red-400 text-[11px]">
                                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                                {imageError}
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                )}
            </div>

            {/* ── Submit Bar ───────────────────────────── */}
            <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 h-10 rounded-lg font-black text-xs uppercase tracking-widest
                               bg-[#00FF41] text-[#0B0E14] hover:bg-[#00FF41]/90 disabled:opacity-40 disabled:cursor-not-allowed
                               transition-all duration-200 active:scale-[0.98]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Send className="w-3.5 h-3.5" />
                            Execute Analysis
                        </>
                    )}
                </button>
            </div>
        </motion.form>
    );
}
