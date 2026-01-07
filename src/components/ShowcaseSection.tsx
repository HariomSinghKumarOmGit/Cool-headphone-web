"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-black py-40 overflow-hidden">
      
      {/* Floating Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 left-10 md:left-40 w-64 h-64 border border-white/5 rounded-full blur-3xl bg-white/2" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 right-10 md:right-40 w-96 h-96 border border-white/5 rounded-full blur-3xl bg-white/1" 
      />

      <div className="max-w-7xl mx-auto px-10 md:px-20 relative z-10">
        
        {/* Large Parallax Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <motion.div 
            style={{ opacity }}
            className="lg:col-span-12 text-center mb-40"
          >
            <h2 className="text-7xl md:text-[12rem] font-bold text-white tracking-tighter opacity-10 select-none">
              EVOLUTION
            </h2>
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            className="lg:col-span-7 relative aspect-4/5 rounded-[3rem] overflow-hidden border border-white/10"
          >
            <Image 
              src="/images/lifestyle.png"
              alt="AIOVA Lifestyle"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="lg:col-span-5 flex flex-col gap-20">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 border-l border-white/10"
            >
              <h3 className="text-white text-3xl font-bold mb-6 italic">A Statement in Sound.</h3>
              <p className="text-white/40 text-lg leading-relaxed">
                We believe that premium audio shouldn't just be heard—it should be felt. The AIOVA is a testament to our commitment to both form and function.
              </p>
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 mt-20"
            >
              <Image 
                src="/images/internals.png"
                alt="Internal Detail"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Ending Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-80 text-center"
        >
          <p className="text-white/20 uppercase tracking-[0.5em] text-sm mb-10">The Conclusion</p>
          <h2 className="text-5xl md:text-9xl font-bold text-white tracking-tighter">
            NOTHING ELSE<br />MATTERS.
          </h2>
        </motion.div>

      </div>
    </section>
  );
}
