"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TABS = [
  {
    id: "acoustics",
    label: "Acoustics",
    title: "Mastered Audio Engineering",
    description: "Equipped with custom 40mm titanium-coated drivers, the AIOVA delivers a soundstage that is both intimate and expansive. Every note is rendered with surgical precision.",
    image: "/images/internals.png",
    specs: ["40mm Titanium Drivers", "5Hz - 40kHz Range", "<0.1% THD"]
  },
  {
    id: "comfort",
    label: "Comfort",
    title: "Weightless Endurance",
    description: "Crafted from aerospace-grade aluminum and wrapped in bespoke protein leather. Designed for 12+ hour sessions without a hint of fatigue.",
    image: "/images/internals.png", // Reusing for demo, could be different
    specs: ["Memory Foam Cushions", "Adjustable Tension", "320g Total Weight"]
  },
  {
    id: "battery",
    label: "Battery",
    title: "Day and Night Power",
    description: "Industry-leading efficiency provides up to 60 hours of continuous playback. A 10-minute charge gives you 5 hours of listening time.",
    image: "/images/internals.png",
    specs: ["60 Hours Playback", "USB-C Fast Charge", "Auto-Off Sensor"]
  }
];

export default function SpecsTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <section className="py-40 bg-[#050505] min-h-[150vh] flex flex-col items-center">
      <div className="max-w-7xl w-full px-10 md:px-20">
        
        {/* Header */}
        <div className="mb-20">
          <h3 className="text-white/40 uppercase tracking-[0.3em] text-xs mb-4">Technical Prowess</h3>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Standardizing Excellence.</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-10 border-b border-white/10 mb-20 overflow-x-auto pb-4 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`text-lg md:text-xl font-medium transition-all relative pb-4 whitespace-nowrap ${
                activeTab.id === tab.id ? "text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {tab.label}
              {activeTab.id === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id + "_content"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                {activeTab.title}
              </h4>
              <p className="text-lg text-white/50 mb-12 leading-relaxed max-w-lg">
                {activeTab.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {activeTab.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
                    <span className="text-white/80 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id + "_image"}
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-linear-to-br from-white/5 to-transparent border border-white/10 group"
            >
              <Image 
                src={activeTab.image}
                alt={activeTab.label}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] to-transparent opacity-40" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Extended Scroll Area - Decorative Elements */}
      <div className="w-full max-w-7xl px-10 md:px-20 mt-60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: "Connectivity", text: "Ultra-low latency Bluetooth 5.3 for lossless streaming." },
            { label: "Active Noise", text: "Adaptive ANC that cancels up to 45dB of ambient noise." },
            { label: "Smart Sensors", text: "Crystal clear calls with our 8-microphone array system." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 border border-white/5 rounded-4xl bg-white/2 hover:bg-white/4 transition-colors"
            >
              <h5 className="text-white text-xl font-bold mb-4">{item.label}</h5>
              <p className="text-white/40 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
