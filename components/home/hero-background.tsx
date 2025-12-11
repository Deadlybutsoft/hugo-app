"use client"

export default function HeroBackground() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Main background image with hue adjustment */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-[8000ms] ease-in-out animate-hue-rotate"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dkvkxermy/image/upload/v1765431535/jzTMdaQ6X2Js2yDQdPP9o3L3XUA_xymyp9.avif')`,
          filter: 'hue-rotate(0deg) saturate(1.1) brightness(1.05) contrast(1.1)'
        }}
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Animated color overlay for dynamic effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
    </div>
  )
}
