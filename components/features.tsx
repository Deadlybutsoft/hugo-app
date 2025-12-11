"use client"

import type React from "react"

import { useTheme } from "next-themes"
import Earth from "./ui/globe"
import ScrambleHover from "./ui/scramble"
import { motion, useInView } from "framer-motion"
import { Suspense, useEffect, useRef, useState } from "react"
import { geist } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Plus, ArrowUp, Music, Video, Image as ImageIcon, FileText, Bot, Clock, Code, Mic, Palette } from "lucide-react"
import chipLoaderStyles from "./ChipLoader.module.css"
import sendBtnStyles from "./SendButton.module.css"
import styles from "./Features3D.module.css"
import composerStyles from "./Composer.module.css"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const { theme } = useTheme()
  const [isHovering, setIsHovering] = useState(false)
  const [isCliHovering, setIsCliHovering] = useState(false)
  const [isFeature3Hovering, setIsFeature3Hovering] = useState(false)
  const [isFeature4Hovering, setIsFeature4Hovering] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const [baseColor, setBaseColor] = useState<[number, number, number]>([0.816, 0.996, 0.09]) // #D0FE17 in RGB normalized
  const [glowColor, setGlowColor] = useState<[number, number, number]>([0.816, 0.996, 0.09]) // #D0FE17 in RGB normalized

  const [dark, setDark] = useState<number>(theme === "dark" ? 1 : 0)

  useEffect(() => {
    setBaseColor([0.816, 0.996, 0.09]) // #D0FE17
    setGlowColor([0.816, 0.996, 0.09]) // #D0FE17
    setDark(theme === "dark" ? 1 : 0)
  }, [theme])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setInputValue("")
    }
  }

  return (
    <section id="features" className="text-foreground relative overflow-hidden py-12 sm:py-24 md:py-32">
      <div className="bg-primary absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-primary/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >

        <div className="flex flex-col items-center text-center mb-[-2rem] z-10 relative">
          <button
            type="button"
            className="group relative z-[60] mx-auto rounded-full border border-white/20 bg-white/5 px-6 py-1 text-xs backdrop-blur transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-100 md:text-sm"
          >
            <div className="absolute inset-x-0 -top-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
            <div className="absolute inset-x-0 -bottom-px mx-auto h-0.5 w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:h-px"></div>
            <span className="relative text-white">FEATURES</span>
          </button>
        </div>

        <div>
          <div className="grid grid-cols-12 gap-4 justify-center">
            {/* Conversational IP Registration */}
            <motion.div
              className="col-span-12 md:col-span-4 h-full mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className={styles.cards}>
                <div
                  className={cn(
                    "group border-emerald-500/20 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border p-6 shadow-[0px_2px_0px_0px_rgba(16,185,129,0.1)_inset] transition-all ease-in-out h-full",
                    "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
                    styles.card,
                    styles.noTilt
                  )}
                  onMouseEnter={() => setIsFeature3Hovering(true)}
                  onMouseLeave={() => setIsFeature3Hovering(false)}
                  style={{
                    background: "#064e3b",
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className="flex flex-col gap-4 items-center text-center">
                      <h3 className="text-2xl leading-none font-semibold tracking-tight">Conversational IP Registration</h3>
                      <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm items-center">
                        <p className="max-w-[460px]">
                          Simply chat with our AI to register your IP. Upload files, get verification, and secure your ownership—all through natural conversation.
                        </p>
                      </div>
                    </div>


                    <div className="flex grow items-center justify-center select-none relative min-h-[60px] p-2">
                      <div className="w-full max-w-lg relative z-20">
                        <div className={composerStyles.container_chat_bot}>
                          <div className={composerStyles['container-chat-options']}>
                            <div className={composerStyles.chat}>
                              <div className={composerStyles['chat-bot']}>
                                <textarea
                                  placeholder="Register something..."
                                  className={composerStyles.textarea}
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  rows={1}
                                  style={{ minHeight: "50px" }}
                                />
                              </div>
                              <div className={composerStyles.options}>
                                <div className={composerStyles['btns-add']}>
                                  <button>
                                    <Plus width={24} height={24} />
                                  </button>
                                </div>
                                <button className={composerStyles['btn-submit']}>
                                  <i>
                                    <ArrowUp />
                                  </i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Blockchain IP Registration */}
            <motion.div
              className="col-span-12 md:col-span-4 h-full mt-8"
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className={styles.cards}>
                <div
                  className={cn(
                    "group border-white/10 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all ease-in-out h-full",
                    "hover:border-[#D0FE17]/60 hover:shadow-[0_0_30px_rgba(208,254,23,0.2)]",
                    styles.card,
                    styles.noTilt
                  )}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={{
                    background: "#064e3b",
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className="flex flex-col gap-4 items-center text-center">
                      <h3 className="text-2xl leading-none font-semibold tracking-tight">Blockchain IP Registration</h3>
                      <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm items-center">
                        <p className="max-w-[460px]">
                          Register your IP on Story Protocol with immutable, verifiable proof of ownership stored securely on the blockchain.
                        </p>
                      </div>
                    </div>
                    <div className="flex min-h-[60px] grow items-start justify-center select-none">

                      <div className="absolute top-48 z-10 flex items-center justify-center">
                        <div className="w-[600px] h-[600px]">
                          <Suspense
                            fallback={
                              <div className="bg-secondary/20 h-[600px] w-[600px] animate-pulse rounded-full"></div>
                            }
                          >
                            <Earth baseColor={baseColor} markerColor={[0, 0, 0]} glowColor={glowColor} dark={dark} />
                          </Suspense>
                        </div>
                      </div>
                      <div className="absolute top-1/2 w-full translate-y-20 scale-x-[1.2] opacity-70 transition-all duration-1000 group-hover:translate-y-8 group-hover:opacity-100">
                        <div className="from-primary/50 to-primary/0 absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[512px] dark:opacity-100"></div>
                        <div className="from-primary/30 to-primary/0 absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[256px] dark:opacity-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Multi-Format Support */}
            <motion.div
              className="col-span-12 md:col-span-4 h-full mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <div className={styles.cards}>
                <div
                  className={cn(
                    "group border-white/10 text-card-foreground relative flex flex-col overflow-hidden rounded-xl border p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all ease-in-out h-full",
                    "hover:border-[#D0FE17]/60 hover:shadow-[0_0_30px_rgba(208,254,23,0.2)]",
                    styles.card,
                    styles.noTilt
                  )}
                  onMouseEnter={() => setIsFeature4Hovering(true)}
                  onMouseLeave={() => setIsFeature4Hovering(false)}
                  style={{
                    background: "#064e3b",
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className="flex flex-col gap-4 items-center text-center">
                      <h3 className="text-2xl leading-none font-semibold tracking-tight">Multi-Format Support</h3>
                      <div className="text-md text-muted-foreground flex flex-col gap-2 text-sm items-center">
                        <p className="max-w-[460px]">
                          Upload nearly anything: text, images, code snippets, audio, lyrics, or mixed media. Our AI handles it all seamlessly.
                        </p>
                      </div>
                    </div>
                    <div className="flex grow items-center justify-center select-none relative min-h-[60px] p-2">
                      <div className={chipLoaderStyles['main-container']}>
                        <div className={chipLoaderStyles.loader}>
                          <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <defs>
                              <linearGradient id="chipGradient" x1={0} y1={0} x2={0} y2={1}>
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#e0e0e0" />
                              </linearGradient>
                              <linearGradient id="textGradient" x1={0} y1={0} x2={0} y2={1}>
                                <stop offset="0%" stopColor="#333333" />
                                <stop offset="100%" stopColor="#000000" />
                              </linearGradient>
                              <linearGradient id="pinGradient" x1={1} y1={0} x2={0} y2={0}>
                                <stop offset="0%" stopColor="#bbbbbb" />
                                <stop offset="50%" stopColor="#888888" />
                                <stop offset="100%" stopColor="#555555" />
                              </linearGradient>
                            </defs>
                            <g id="traces">
                              <path d="M100 100 H200 V210 H326" className={chipLoaderStyles['trace-bg']} />
                              <path d="M100 100 H200 V210 H326" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.purple}`} />
                              <path d="M80 180 H180 V230 H326" className={chipLoaderStyles['trace-bg']} />
                              <path d="M80 180 H180 V230 H326" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.blue}`} />
                              <path d="M60 260 H150 V250 H326" className={chipLoaderStyles['trace-bg']} />
                              <path d="M60 260 H150 V250 H326" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.yellow}`} />
                              <path d="M100 350 H200 V270 H326" className={chipLoaderStyles['trace-bg']} />
                              <path d="M100 350 H200 V270 H326" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.green}`} />
                              <path d="M700 90 H560 V210 H474" className={chipLoaderStyles['trace-bg']} />
                              <path d="M700 90 H560 V210 H474" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.blue}`} />
                              <path d="M740 160 H580 V230 H474" className={chipLoaderStyles['trace-bg']} />
                              <path d="M740 160 H580 V230 H474" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.green}`} />
                              <path d="M720 250 H590 V250 H474" className={chipLoaderStyles['trace-bg']} />
                              <path d="M720 250 H590 V250 H474" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.red}`} />
                              <path d="M680 340 H570 V270 H474" className={chipLoaderStyles['trace-bg']} />
                              <path d="M680 340 H570 V270 H474" className={`${chipLoaderStyles['trace-flow']} ${chipLoaderStyles.yellow}`} />
                            </g>
                            <rect x={330} y={190} width={140} height={100} rx={20} ry={20} fill="url(#chipGradient)" stroke="#222" strokeWidth={3} filter="drop-shadow(0 0 6px rgba(0,0,0,0.8))" />
                            <g>
                              <rect x={322} y={205} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                              <rect x={322} y={225} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                              <rect x={322} y={245} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                              <rect x={322} y={265} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                            </g>
                            <g>
                              <rect x={470} y={205} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                              <rect x={470} y={225} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                              <rect x={470} y={245} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                              <rect x={470} y={265} width={8} height={10} fill="url(#pinGradient)" rx={2} />
                            </g>
                            <text x={400} y={240} fontFamily="Arial, sans-serif" fontSize={22} fill="url(#textGradient)" textAnchor="middle" alignmentBaseline="middle">
                              STORY
                            </text>
                            <circle cx={100} cy={100} r={5} fill="#ffffff" />
                            <circle cx={80} cy={180} r={5} fill="#ffffff" />
                            <circle cx={60} cy={260} r={5} fill="#ffffff" />
                            <circle cx={100} cy={350} r={5} fill="#ffffff" />
                            <circle cx={700} cy={90} r={5} fill="#ffffff" />
                            <circle cx={740} cy={160} r={5} fill="#ffffff" />
                            <circle cx={720} cy={250} r={5} fill="#ffffff" />
                            <circle cx={680} cy={340} r={5} fill="#ffffff" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI-Powered IP Detection - Same Width as Combined Cards */}
            <motion.div
              className="col-span-12 h-full mt-20"
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className={styles.cards}>
                <div
                  className={cn(
                    "group border-transparent text-card-foreground relative flex flex-col overflow-hidden rounded-xl border-0 p-6 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset] transition-all ease-in-out h-full",
                    "hover:shadow-[0_0_30px_rgba(208,254,23,0.2)]",
                    styles.card,
                    styles.noTilt
                  )}
                  onMouseEnter={() => setIsCliHovering(true)}
                  onMouseLeave={() => setIsCliHovering(false)}
                  style={{
                    background: "#064e3b",
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className="flex flex-col gap-4 items-center text-center pt-6">
                      <h3 className="text-6xl md:text-9xl leading-none font-bold tracking-tighter uppercase font-[family-name:var(--font-bricolage)]"></h3>
                    </div>
                    <div className="pointer-events-none flex grow items-center justify-center select-none relative">
                      <div
                        className="relative w-full h-[500px] rounded-xl overflow-hidden"
                        style={{ borderRadius: "20px" }}
                      >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                          <img
                            src="https://framerusercontent.com/images/UjqUIiBHmIcSH9vos9HlG2BF4bo.png"
                            alt="Arrow-CoreExchange"
                            className="w-full h-full object-cover rounded-xl hue-rotate-15 saturate-150"
                          />
                        </div>

                        {/* Animated SVG Connecting Lines */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={isCliHovering ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                            <motion.path
                              d="M 60.688 1.59 L 60.688 92.449 M 60.688 92.449 L 119.368 92.449 M 60.688 92.449 L 1.414 92.449"
                              stroke="rgb(255,222,213)"
                              fill="transparent"
                              strokeDasharray="2 2"
                              initial={{ pathLength: 0 }}
                              animate={isCliHovering ? { pathLength: 1 } : { pathLength: 0 }}
                              transition={{
                                duration: 2,
                                ease: "easeInOut",
                              }}
                            />
                          </svg>
                          <svg width="100%" height="100%" viewBox="0 0 121 94" className="absolute">
                            <motion.path
                              d="M 60.688 92.449 L 60.688 1.59 M 60.688 1.59 L 119.368 1.59 M 60.688 1.59 L 1.414 1.59"
                              stroke="rgb(255,222,213)"
                              fill="transparent"
                              strokeDasharray="2 2"
                              initial={{ pathLength: 0 }}
                              animate={isCliHovering ? { pathLength: 1 } : { pathLength: 0 }}
                              transition={{
                                duration: 2,
                                delay: 0.5,
                                ease: "easeInOut",
                              }}
                            />
                          </svg>
                        </motion.div>

                        {/* Animated Purple Blur Effect */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500 rounded-full blur-[74px] opacity-65 transform -translate-x-1/2 -translate-y-1/2"
                          initial={{ scale: 1 }}
                          animate={isCliHovering ? { scale: [1, 1.342, 1, 1.342] } : { scale: 1 }}
                          transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: isCliHovering ? Number.POSITIVE_INFINITY : 0,
                            repeatType: "loop",
                          }}
                        />

                        {/* Main Content Container with Staggered Animations */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center gap-16 scale-150">
                            {/* Left Column */}
                            <div className="flex flex-col gap-5 w-56 items-end">
                              {["Music", "Video", "Image"].map((item, index) => (
                                <motion.div
                                  key={`left-${index}`}
                                  className="bg-white rounded-lg px-6 py-4 flex items-center gap-3 text-black text-lg font-medium shadow-sm font-[family-name:var(--font-bricolage)]"
                                  initial={{ opacity: 1, x: 0 }}
                                  animate={isCliHovering ? { x: [-20, 0] } : { x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="w-6 h-6 flex items-center justify-center text-black">
                                    {index === 0 && <Music className="w-5 h-5" />}
                                    {index === 1 && <Video className="w-5 h-5" />}
                                    {index === 2 && <ImageIcon className="w-5 h-5" />}
                                  </div>
                                  {item}
                                </motion.div>
                              ))}
                            </div>

                            {/* Center Logo */}
                            <motion.div
                              className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg bg-black"
                              initial={{ opacity: 1, scale: 1 }}
                              animate={isCliHovering ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <img
                                src="https://res.cloudinary.com/dkvkxermy/image/upload/v1765368792/ip-badge_lcukbr.png"
                                alt="Logo"
                                className="w-full h-full object-contain p-2"
                              />
                            </motion.div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-5 w-56 items-start">
                              {["Text", "Agent", "Audio"].map((item, index) => (
                                <motion.div
                                  key={`right-${index}`}
                                  className="bg-white rounded-lg px-6 py-4 flex items-center gap-3 text-black text-lg font-medium shadow-sm font-[family-name:var(--font-bricolage)]"
                                  initial={{ opacity: 1, x: 0 }}
                                  animate={isCliHovering ? { x: [20, 0] } : { x: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <div className="w-6 h-6 flex items-center justify-center text-black">
                                    {index === 0 && <FileText className="w-5 h-5" />}
                                    {index === 1 && <Bot className="w-5 h-5" />}
                                    {index === 2 && <Mic className="w-5 h-5" />}
                                  </div>
                                  {item}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Animated Circular Border */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={isCliHovering ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <svg width="350" height="350" viewBox="0 0 350 350" className="opacity-40">
                            <motion.path
                              d="M 175 1.159 C 271.01 1.159 348.841 78.99 348.841 175 C 348.841 271.01 271.01 348.841 175 348.841 C 78.99 348.841 1.159 271.01 1.159 175 C 1.159 78.99 78.99 1.159 175 1.159 Z"
                              stroke="rgba(255, 255, 255, 0.38)"
                              strokeWidth="1.16"
                              fill="transparent"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0, rotate: 0 }}
                              animate={isCliHovering ? { pathLength: 1, rotate: 360 } : { pathLength: 0, rotate: 0 }}
                              transition={{
                                pathLength: { duration: 3, ease: "easeInOut" },
                                rotate: {
                                  duration: 20,
                                  repeat: isCliHovering ? Number.POSITIVE_INFINITY : 0,
                                  ease: "linear",
                                },
                              }}
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section >
  )
}
