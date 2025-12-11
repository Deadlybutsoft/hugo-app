"use client"

import { motion } from "framer-motion"
import HeroBackground from "./hero-background"
import { ArrowRight } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <HeroBackground />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-8 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl">
                        HUGO
                    </h1>
                </motion.div>

                <motion.p
                    className="text-xl md:text-2xl text-white/90 max-w-2xl font-light drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    The first conversational IP registration platform.
                    Protect your creative work on Story Protocol with a simple chat.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="/chat"
                        className="px-8 py-4 rounded-full bg-[#D0FE17] text-black font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(208,254,23,0.3)]"
                    >
                        Start Registering <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                        href="#features"
                        className="px-8 py-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-bold text-lg hover:bg-white/10 transition-colors hover:border-[#D0FE17]/50"
                    >
                        Learn More
                    </a>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    )
}
