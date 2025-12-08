"use client"

import React, { useEffect, useRef } from "react"
import styles from "./moving-text-board.module.css"

export function MovingTextBoard() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Set initial CSS variables that were in the original JS
        if (containerRef.current) {
            // Default values from the provided JS
            containerRef.current.style.setProperty("--hue", "33")
            containerRef.current.style.setProperty("--duration", "10")
            containerRef.current.style.setProperty("--bg-lightness", "0.1")
            containerRef.current.style.setProperty("--scale", "1.1")
        }
    }, [])

    return (
        <div className="w-full flex justify-center py-20 relative overflow-hidden">
            <div ref={containerRef} className={`${styles.boardContainer} group`}>
                <div className="absolute inset-x-0 -top-[2px] mx-auto h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
                <div className="absolute inset-x-0 -bottom-[2px] mx-auto h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#D0FE17] to-transparent shadow-2xl transition-all duration-500 group-hover:w-3/4"></div>
                <div className={styles.rivets}>
                    <div className={styles.rivet}></div>
                    <div className={styles.rivet}></div>
                    <div className={styles.rivet}></div>
                    <div className={styles.rivet}></div>
                </div>
                <div className={styles.board}>
                    <div className={styles.boardContent}>
                        <div className={styles.textTrack}>
                            <div className={styles.text}>HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  </div>
                            <div className={styles.text}>HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  HUGO  </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
