import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function ObiSigil({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] text-[#e0e0e0] flex flex-col z-50 font-mono overflow-hidden"
         style={{
           backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
      {/* Header */}
      <div className="flex items-center p-4 border-b border-zinc-800 bg-black/50 backdrop-blur-md z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </button>
        <h2 className="text-sm font-semibold ml-2 font-sans">Obi Sigil Schedule</h2>
      </div>

      {/* SVG Container */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <svg viewBox="0 0 400 600" className="w-full h-full max-w-[600px] max-h-[800px] drop-shadow-[0_0_5px_rgba(0,243,255,0.3)]">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* The Spine (Will) */}
          <line x1="200" y1="150" x2="200" y2="450" stroke="#e0e0e0" strokeWidth="8" strokeLinecap="round" strokeDasharray="10, 5" />

          {/* The Top Loop "O" (Mental/Input) */}
          <circle cx="200" cy="150" r="100" stroke="#bc13fe" strokeWidth="8" fill="none" style={{ filter: 'drop-shadow(0 0 10px #bc13fe)' }} />

          {/* The Bottom Loop "b" (Physical/Output) */}
          <path d="M 200 350 Q 320 350 320 450 Q 320 550 200 550" stroke="#00f3ff" strokeWidth="8" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 10px #00f3ff)' }} />
          <line x1="200" y1="450" x2="200" y2="550" stroke="#00f3ff" strokeWidth="8" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 10px #00f3ff)' }} />

          {/* Labels */}
          <text x="200" y="40" fill="#bc13fe" fontSize="24" textAnchor="middle" style={{ fontFamily: 'cursive' }}>04:32</text>
          <text x="200" y="150" fill="#e0e0e0" fontSize="24" textAnchor="middle" style={{ fontFamily: 'cursive' }}>AYIN (O)</text>
          <text x="200" y="170" fill="#888" fontSize="14" textAnchor="middle">METAL / INPUT</text>

          <text x="270" y="450" fill="#00f3ff" fontSize="24" textAnchor="middle" style={{ fontFamily: 'cursive' }}>BETH (b)</text>
          <text x="270" y="470" fill="#888" fontSize="14" textAnchor="middle">WATER / OUTPUT</text>

          <text x="160" y="300" fill="#888" fontSize="14" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>THE SPINE</text>

          {/* The Daleth Point */}
          <circle cx="200" cy="250" r="8" fill="#0aff0a" stroke="#0a0a0a" strokeWidth="2" className="animate-pulse" />
          <text x="220" y="255" fill="#0aff0a" fontSize="14" textAnchor="start">DALETH (Door)</text>
        </svg>
      </div>
    </div>
  );
}
