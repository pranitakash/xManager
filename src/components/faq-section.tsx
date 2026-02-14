"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";

const faqs = [
    {
        question: "Will this actually help me stop bottling games?",
        answer: "100%. Whether it's the 90th-minute sweat or a tactical mismatch, our 'Lab' identifies exactly where you're losing control so you can keep your nerve and secure the win."
    },
    {
        question: "Is it compatible with my console or PC setup?",
        answer: "Everywhere. xManager is built to support FC 25 and legacy FIFA titles across all platforms. If you play the game, we've got your back."
    },
    {
        question: "What makes xManager better than just Googling tactics?",
        answer: "YouTubers give you generic sliders. xManager gives you custom instructions tailored specifically to your squad's PlayStyles and how YOU actually play."
    },
    {
        question: "Will the SBC solver put my account at risk?",
        answer: "Safety first, gaffer. Our solver uses human-like logic and club-first inventory scanning to ensure zero risk to your account while saving you thousands of coins."
    }
];

export function FaqSection() {
    return (
        <section id="pitch-notes" className="py-48 bg-[#0B0E14] px-6">
            <div className="max-w-4xl mx-auto">
                <BlurFade delay={0.2} inView>
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-[-0.05em] mb-6">
                            Pitch <span className="text-[#00FF41]">Notes</span>
                        </h2>
                        <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Everything you need to know to stop the bottle.</p>
                    </div>
                </BlurFade>

                <div className="space-y-6">
                    {faqs.map((faq, idx) => (
                        <BlurFade key={idx} delay={0.3 + (idx * 0.1)} inView>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem
                                    value={`item-${idx}`}
                                    className="border-white/5 bg-white/[0.01] rounded-3xl px-10 hover:bg-white/[0.03] transition-colors"
                                >
                                    <AccordionTrigger className="text-white font-black text-xl hover:no-underline hover:text-[#00FF41] transition-all py-10 uppercase tracking-tight text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-500 text-lg leading-relaxed pb-10 font-medium">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
