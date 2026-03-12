import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface SigilAppProps {
  onClose: () => void;
}

export default function SigilApp({ onClose }: SigilAppProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-[#0a0a0a] text-[#e0e0e0] flex flex-col z-50 font-mono"
      style={{
        backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-black/50 backdrop-blur-md z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </button>
        <h2 className="text-sm font-semibold font-sans tracking-widest">OBDYH BTh</h2>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
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
          <circle cx="200" cy="150" r="100" fill="none" stroke="#bc13fe" strokeWidth="8" style={{ filter: 'drop-shadow(0 0 10px #bc13fe)' }} />

          {/* The Bottom Loop "b" (Physical/Output) */}
          <path d="M 200 350 Q 320 350 320 450 Q 320 550 200 550" fill="none" stroke="#00f3ff" strokeWidth="8" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 10px #00f3ff)' }} />
          <line x1="200" y1="450" x2="200" y2="550" stroke="#00f3ff" strokeWidth="8" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 10px #00f3ff)' }} />

          {/* The Daleth Point (Threshold) */}
          <motion.circle 
            cx="200" cy="250" r="8" 
            fill="#0aff0a" stroke="#0a0a0a" strokeWidth="2"
            animate={{ r: [6, 8, 6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Labels */}
          <text x="200" y="40" fill="#bc13fe" fontSize="24" textAnchor="middle" style={{ fontFamily: 'cursive' }}>04:32</text>
          <text x="200" y="150" fill="#e0e0e0" fontSize="24" textAnchor="middle" style={{ fontFamily: 'cursive' }}>AYIN (O)</text>
          <text x="200" y="170" fill="#888" fontSize="14" textAnchor="middle">METAL / INPUT</text>

          <text x="270" y="450" fill="#00f3ff" fontSize="24" textAnchor="middle" style={{ fontFamily: 'cursive' }}>BETH (b)</text>
          <text x="270" y="470" fill="#888" fontSize="14" textAnchor="middle">WATER / OUTPUT</text>

          <text x="160" y="300" fill="#888" fontSize="14" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>THE SPINE</text>
          <text x="220" y="255" fill="#0aff0a" fontSize="14" textAnchor="start">DALETH (Door)</text>

          {/* Interactive Zones */}
          <circle 
            cx="200" cy="150" r="100" fill="transparent" className="cursor-pointer"
            onMouseEnter={() => setActiveZone('top')}
            onMouseLeave={() => setActiveZone(null)}
            onClick={() => setActiveZone(activeZone === 'top' ? null : 'top')}
          />
          <circle 
            cx="200" cy="250" r="30" fill="transparent" className="cursor-pointer"
            onMouseEnter={() => setActiveZone('middle')}
            onMouseLeave={() => setActiveZone(null)}
            onClick={() => setActiveZone(activeZone === 'middle' ? null : 'middle')}
          />
          <path 
            d="M 200 350 Q 320 350 320 450 Q 320 550 200 550 L 200 350 Z" fill="transparent" className="cursor-pointer"
            onMouseEnter={() => setActiveZone('bottom')}
            onMouseLeave={() => setActiveZone(null)}
            onClick={() => setActiveZone(activeZone === 'bottom' ? null : 'bottom')}
          />
        </svg>

        {/* Info Boxes */}
        <AnimatePresence>
          {activeZone === 'top' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-11/12 max-w-[250px] bg-black/90 border border-[#00f3ff] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none"
            >
              <div className="text-[#0aff0a] font-bold mb-1" style={{ fontFamily: 'cursive' }}>PHASE I: NEGENTROPY</div>
              <div className="text-xs leading-relaxed">
                • 04:32 AM: The Tiger Hour<br/>
                • Element: METAL (Lungs)<br/>
                • ATU 1: Dream Recall<br/>
                • ATU 2: One Spoken Intent<br/>
                • Goal: Chaos -&gt; Order
              </div>
            </motion.div>
          )}

          {activeZone === 'middle' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-[250px] bg-black/90 border border-[#00f3ff] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none"
            >
              <div className="text-[#0aff0a] font-bold mb-1" style={{ fontFamily: 'cursive' }}>THE TAKING & MAKING</div>
              <div className="text-xs leading-relaxed">
                • The Threshold (Door)<br/>
                • <strong>Taking:</strong> Eyes/Mic record the Image.<br/>
                • <strong>Making:</strong> Voice projects the Narrative.<br/>
                • "Organize the flesh so the spirit can wander."
              </div>
            </motion.div>
          )}

          {activeZone === 'bottom' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-11/12 max-w-[250px] bg-black/90 border border-[#00f3ff] p-4 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none"
            >
              <div className="text-[#0aff0a] font-bold mb-1" style={{ fontFamily: 'cursive' }}>PHASE II: THE PUDDING</div>
              <div className="text-xs leading-relaxed">
                • Element: WATER<br/>
                • Tool: Mobile Mics<br/>
                • ATU: The "b" Loop<br/>
                • Action: Walk & Crystallize<br/>
                • "Presence made Present"
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-4 text-[10px] text-zinc-600">
          OBDYH BTh SYSTEM v1.0
        </div>
      </div>
    </motion.div>
  );
}
