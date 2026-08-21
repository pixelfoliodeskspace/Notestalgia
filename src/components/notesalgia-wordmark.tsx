import React, { useState } from "react";

export interface NotesalgiaWordmarkProps {
  /**
   * Primary color for "Notes" section (default: "#FFFFFF")
   */
  notesColor?: string;
  /**
   * Secondary color for "algia" section (default: "#19C7D9")
   */
  algiaColor?: string;
  /**
   * Base font size (e.g. "text-3xl", "text-5xl", or inline style size)
   */
  className?: string;
  /**
   * Optional custom font family (default: Outfit / Montserrat Lionsgate match)
   */
  fontFamily?: string;
  /**
   * Letter spacing (tracking)
   */
  letterSpacing?: string;
}

/**
 * NotesalgiaWordmark
 *
 * Requirements:
 * - Only "N" is uppercase, "otesalgia" is lowercase
 * - Same visual height: Lowercase letters are optically scaled & stroke-compensated
 *   so "otesalgia" sits at the exact visual height of "N" without being fatter/bolder.
 * - Two-tone color separation: "Notes" + "algia"
 * - 100% editable, selectable vector text (No images, no rasterization)
 * - Exact Lionsgate geometric styling (Outfit / Montserrat)
 */
export function NotesalgiaWordmark({
  notesColor = "#FFFFFF",
  algiaColor = "#19C7D9",
  className = "text-4xl",
  fontFamily = "'Outfit', 'Montserrat', sans-serif",
  letterSpacing = "-0.025em",
}: NotesalgiaWordmarkProps) {
  return (
    <span
      className={`inline-flex items-baseline select-text leading-none ${className}`}
      style={{
        fontFamily,
        letterSpacing,
        WebkitFontSmoothing: "antialiased",
        textRendering: "geometricPrecision",
      }}
      aria-label="Notesalgia"
    >
      {/* "Notes" section */}
      <span
        style={{ color: notesColor }}
        className="inline-flex items-baseline tracking-inherit"
      >
        {/* Uppercase "N" */}
        <span
          className="uppercase inline-block font-[600]"
          style={{
            fontSize: "1em",
            lineHeight: 0.8,
            transform: "translateY(0.01em)",
          }}
        >
          N
        </span>

        {/* Lowercase "otes" scaled to match N height with light weight (300) to balance stroke width */}
        <span
          className="lowercase inline-block font-[350]"
          style={{
            fontSize: "1.36em",
            lineHeight: 0.8,
            marginLeft: "-0.015em",
          }}
        >
          otes
        </span>
      </span>

      {/* "algia" section: scaled to exact same visual height */}
      <span
        style={{
          color: algiaColor,
          fontSize: "1.36em",
          lineHeight: 0.8,
          marginLeft: "-0.01em",
        }}
        className="lowercase inline-block font-[350] tracking-inherit"
      >
        algia
      </span>
    </span>
  );
}

/**
 * 8 Color variations required by design specification
 */
export const WORDMARK_VARIATIONS = [
  {
    id: 1,
    name: "1. White + Cyan",
    notes: "#FFFFFF",
    algia: "#19C7D9",
    bg: "#0B131A",
    border: "rgba(25, 199, 217, 0.25)",
    tag: "Primary / Tech Modern",
  },
  {
    id: 2,
    name: "2. White + Gold",
    notes: "#FFFFFF",
    algia: "#E5B842",
    bg: "#14120C",
    border: "rgba(229, 184, 66, 0.25)",
    tag: "Cinematic / Premium Luxury",
  },
  {
    id: 3,
    name: "3. White + Teal",
    notes: "#FFFFFF",
    algia: "#2DD4BF",
    bg: "#0A1817",
    border: "rgba(45, 212, 191, 0.25)",
    tag: "Fresh / Modern Editorial",
  },
  {
    id: 4,
    name: "4. White + Purple",
    notes: "#FFFFFF",
    algia: "#C084FC",
    bg: "#150C1F",
    border: "rgba(192, 132, 252, 0.25)",
    tag: "Creative / Futuristic",
  },
  {
    id: 5,
    name: "5. White + Coral",
    notes: "#FFFFFF",
    algia: "#FF6B6B",
    bg: "#1A0C0E",
    border: "rgba(255, 107, 107, 0.25)",
    tag: "Dynamic / Energetic",
  },
  {
    id: 6,
    name: "6. Cream + Dark Green",
    notes: "#F4F3ED",
    algia: "#4ADE80",
    bg: "#0E1A13",
    border: "rgba(74, 222, 128, 0.25)",
    tag: "Nature / Organic Editorial",
  },
  {
    id: 7,
    name: "7. White + Royal Blue",
    notes: "#FFFFFF",
    algia: "#38BDF8",
    bg: "#0A1326",
    border: "rgba(56, 189, 248, 0.25)",
    tag: "Clean / Corporate Trust",
  },
  {
    id: 8,
    name: "8. White + Orange",
    notes: "#FFFFFF",
    algia: "#FB923C",
    bg: "#1A1009",
    border: "rgba(251, 146, 60, 0.25)",
    tag: "Bold / Studio Impact",
  },
];

const FONT_OPTIONS = [
  {
    id: "outfit",
    label: "Outfit (Exact Lionsgate Geometry)",
    family: "'Outfit', sans-serif",
  },
  {
    id: "montserrat",
    label: "Montserrat (Geometric Clean)",
    family: "'Montserrat', sans-serif",
  },
  {
    id: "jakarta",
    label: "Plus Jakarta Sans (Modern)",
    family: "'Plus Jakarta Sans', sans-serif",
  },
];

/**
 * NotesalgiaBrandShowcase
 * Visual interactive presentation showcase
 */
export function NotesalgiaBrandShowcase() {
  const [selectedFont, setSelectedFont] = useState(FONT_OPTIONS[0].family);
  const [scale, setScale] = useState<number>(1.36);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 text-left">
      <div className="bg-[#0A0E17] text-white rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#19C7D9]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Title Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono tracking-widest text-[#19C7D9] uppercase font-semibold mb-3">
              Precision Height Equalization System
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Notesalgia Wordmark Specification
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Lowercase letters optically enlarged &amp; stroke-compensated to match <strong className="text-white font-mono">N</strong>'s exact cap-height line.
            </p>
          </div>

          {/* Controls: Scale & Font */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Height Scale Fine-Tuner */}
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
              <span className="text-gray-400 font-mono text-[10px] uppercase">Height Scale:</span>
              <button
                onClick={() => setScale(1.30)}
                className={`px-2 py-0.5 rounded-lg text-xs transition-all ${scale === 1.30 ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                1.30
              </button>
              <button
                onClick={() => setScale(1.36)}
                className={`px-2 py-0.5 rounded-lg text-xs transition-all ${scale === 1.36 ? "bg-[#19C7D9] text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                1.36 [Match N]
              </button>
              <button
                onClick={() => setScale(1.42)}
                className={`px-2 py-0.5 rounded-lg text-xs transition-all ${scale === 1.42 ? "bg-white text-black font-bold" : "text-gray-400 hover:text-white"}`}
              >
                1.42
              </button>
            </div>

            {/* Font Switcher */}
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10 text-xs">
              <span className="text-gray-400 font-mono text-[10px] uppercase px-2">Font:</span>
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFont(f.family)}
                  className={`px-3 py-1 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedFont === f.family
                      ? "bg-[#19C7D9] text-black font-semibold shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {f.label.split(" (")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master Showcase: Big Display */}
        <div className="my-10 p-10 sm:p-14 bg-black/60 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center relative">
          <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-6 font-mono">
            Master Wordmark • Same Visual Height Across All Glyphs
          </div>

          {/* Visual alignment guide line overlay */}
          <div className="relative py-4 overflow-x-auto max-w-full">
            {/* Top guide line */}
            <div className="absolute top-4 left-0 right-0 h-px bg-[#19C7D9]/30 pointer-events-none" />
            {/* Baseline guide line */}
            <div className="absolute bottom-4 left-0 right-0 h-px bg-white/20 pointer-events-none" />

            <span
              className="inline-flex items-baseline select-text leading-none text-6xl sm:text-7xl md:text-8xl lg:text-9xl"
              style={{
                fontFamily: selectedFont,
                letterSpacing: "-0.025em",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {/* Notes */}
              <span style={{ color: "#FFFFFF" }} className="inline-flex items-baseline">
                <span className="uppercase inline-block font-[600]" style={{ fontSize: "1em", lineHeight: 0.8 }}>
                  N
                </span>
                <span className="lowercase inline-block font-[350]" style={{ fontSize: `${scale}em`, lineHeight: 0.8, marginLeft: "-0.015em" }}>
                  otes
                </span>
              </span>

              {/* algia */}
              <span
                style={{
                  color: "#19C7D9",
                  fontSize: `${scale}em`,
                  lineHeight: 0.8,
                  marginLeft: "-0.01em",
                }}
                className="lowercase inline-block font-[350]"
              >
                algia
              </span>
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span>Notes: #FFFFFF</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#19C7D9]" />
              <span>algia: #19C7D9</span>
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-[#19C7D9]">Equalized Visual Height (Scale: {scale}x)</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">{selectedFont.replace(/['",]/g, "")}</span>
          </div>
        </div>

        {/* 8 Color Variations Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-white">
                8 Color Variations (Equal Visual Height)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Exact same typography, geometric proportions, and optical alignment across all options
              </p>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded bg-white/10 text-gray-300">
              8 Palettes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORDMARK_VARIATIONS.map((variant) => (
              <div
                key={variant.id}
                style={{ backgroundColor: variant.bg, borderColor: variant.border }}
                className="p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col justify-between min-h-[160px]"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 mb-3">
                  <span className="font-bold text-white">{variant.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {variant.tag}
                  </span>
                </div>

                <div className="py-3 flex items-center justify-center">
                  <span
                    className="inline-flex items-baseline select-text leading-none text-3xl sm:text-4xl"
                    style={{
                      fontFamily: selectedFont,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    <span style={{ color: variant.notes }} className="inline-flex items-baseline">
                      <span className="uppercase inline-block font-[600]" style={{ fontSize: "1em", lineHeight: 0.8 }}>
                        N
                      </span>
                      <span className="lowercase inline-block font-[350]" style={{ fontSize: `${scale}em`, lineHeight: 0.8, marginLeft: "-0.015em" }}>
                        otes
                      </span>
                    </span>
                    <span
                      style={{
                        color: variant.algia,
                        fontSize: `${scale}em`,
                        lineHeight: 0.8,
                        marginLeft: "-0.01em",
                      }}
                      className="lowercase inline-block font-[350]"
                    >
                      algia
                    </span>
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ backgroundColor: variant.notes }}
                    />
                    {variant.notes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/20"
                      style={{ backgroundColor: variant.algia }}
                    />
                    {variant.algia}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
