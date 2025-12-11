"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import buttonStyles from "./Button17.module.css"

import { bebasNeue } from "@/lib/fonts"

export function NewReleasePromo() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "https://res.cloudinary.com/dkvkxermy/image/upload/v1764555665/WhatsApp_Image_2025-12-01_at_06.27.37_ztmiyp.jpg",
    "https://res.cloudinary.com/dkvkxermy/image/upload/v1764555664/WhatsApp_Image_2025-12-01_at_06.27.05_qk0hns.jpg",
    "https://res.cloudinary.com/dkvkxermy/image/upload/v1764555663/WhatsApp_Image_2025-12-01_at_06.08.54_1_xorzw5.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative overflow-hidden pb-24 pt-24">
      {/* Background blur effects - same as FAQ */}
      <div className="bg-primary/20 absolute top-1/2 -right-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>
      <div className="bg-primary/20 absolute top-1/2 -left-20 z-[-1] h-64 w-64 rounded-full opacity-80 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="relative rounded-[40px] border border-white/10 p-8 md:p-12 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.1)_inset]"
            style={{ background: "#064e3b" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Side - Image Carousel */}
              <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 order-last lg:order-first">
                <AnimatePresence>
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    alt={`Feature ${currentImage + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Image indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentImage
                        ? "bg-[#D0FE17] w-8"
                        : "bg-white/40 w-2 hover:bg-white/60"
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Side - Text and Button */}
              <div className="space-y-8">
                <div>
                  <h2 className={`text-6xl md:text-8xl font-bold text-white mb-6 ${bebasNeue.className}`}>
                    CHAT. UPLOAD. <br />
                    PROTECT YOUR IP.
                  </h2>

                </div>



                <div className="flex items-center justify-center gap-6 mt-12">
                  <a href="/chat">
                    <button className={buttonStyles.btn17}>
                      <span className={buttonStyles.textContainer}>
                        <span className={buttonStyles.text}>GET STARTED</span>
                      </span>
                    </button>
                  </a>
                  <a href="#faq">
                    <button className={buttonStyles.btn17faq}>
                      <span className={buttonStyles.textContainer}>
                        <span className={buttonStyles.text}>READ FAQ</span>
                      </span>
                    </button>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
