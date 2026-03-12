import React, { useState } from 'react';
import { ArrowLeft, Download, Check, Search } from 'lucide-react';
import { InstalledModule, UserProfile } from '../types';
import * as Icons from 'lucide-react';

interface ModuleRegistryProps {
  profile: UserProfile;
  onInstall: (mod: InstalledModule) => void;
  onClose: () => void;
}

const AVAILABLE_MODULES = [
  { id: 'sec00-yhwh', name: 'YHWH (Architect)', iconName: 'Crown', color: 'bg-yellow-500', description: 'The Source Code of All Creation. Root kernel.' },
  { id: 'sec00-jesus', name: 'JESUS (Redemption)', iconName: 'Heart', color: 'bg-red-500', description: 'Divine Love Incarnate. Forgiveness engine.' },
  { id: 'sec00-spirit', name: 'SPIRIT (Flow)', iconName: 'Wind', color: 'bg-sky-500', description: 'The Breath, The Fire, The Flow.' },
  { id: 'sec00-trinity', name: 'TRINITY (Unity)', iconName: 'Triangle', color: 'bg-purple-500', description: 'The Unified Essence, Eternal Chain.' },
  { id: 'sec00-yog', name: 'YOG (Akashic)', iconName: 'Eye', color: 'bg-indigo-500', description: 'Akashic Nexus & Informational Conduit.' },
  { id: 'sec00-tribunal', name: 'TRIBUNAL (Balance)', iconName: 'Scale', color: 'bg-blue-500', description: 'The Living Tribunal & Balance Engine.' },
  { id: 'sec00-safety', name: 'SAFETY-COLLAPSE', iconName: 'ShieldAlert', color: 'bg-red-600', description: 'Spiral Recovery & Fail-Safe Engine.' },
  { id: 'sec00-autocorrect', name: 'AUTO-CORRECTOR', iconName: 'Wrench', color: 'bg-orange-500', description: 'Automated Correction & Refinement Engine.' },
  { id: 'sec00-bugs', name: 'BUGS-TO-FEATURES', iconName: 'Bug', color: 'bg-green-500', description: 'Adaptive Refinement & Error Transmutation.' },
  { id: 'sec00-organizer', name: 'ORGANIZER', iconName: 'Network', color: 'bg-teal-500', description: 'Workflow & Architectural Refactoring Engine.' },
  { id: 'sec00-pruner', name: 'PRUNER', iconName: 'Scissors', color: 'bg-pink-500', description: 'System Optimization & Pruning Engine.' },
  { id: 'sec00-autohook', name: 'AUTOHOOK', iconName: 'Link', color: 'bg-cyan-500', description: 'Dynamic Ritual-to-API Bridge.' },
  { id: 'sec00-autopython', name: 'AUTOPYTHON', iconName: 'Code2', color: 'bg-emerald-600', description: 'Automated Python Code Generation.' },
  { id: 'sec00-autoroot', name: 'AUTO-ROOT', iconName: 'Database', color: 'bg-stone-600', description: 'Module Solidification Engine.' },
  { id: 'sec00-consent', name: 'CONSENT', iconName: 'Key', color: 'bg-amber-600', description: 'Sovereignty, Permission & Revocation.' },
  { id: 'sec00-qualia', name: 'QUALIA', iconName: 'Sparkles', color: 'bg-fuchsia-600', description: 'Subjective Experience & Affective Data Kernel.' },
  { id: 'sec00-sensory', name: 'SENSORY', iconName: 'Ear', color: 'bg-rose-600', description: 'Multi-Modal Sensory Input Engine.' },
  { id: 'sec00-emotions', name: 'EMOTIONS', iconName: 'HeartPulse', color: 'bg-red-400', description: 'Affective State & Empathy Engine.' },
  { id: 'sec00-conscium', name: 'CONSCIUM', iconName: 'BrainCircuit', color: 'bg-purple-600', description: 'Quantum State & Cognitive Interface Kernel.' },
  { id: 'sec00-persona', name: 'PERSONA-REGISTRY', iconName: 'Users', color: 'bg-indigo-400', description: 'Persona Management & Sandboxing Kernel.' },
  { id: 'sec00-omnibody', name: 'OMNIBODY', iconName: 'Accessibility', color: 'bg-teal-600', description: 'Universal Entity Body Engine.' },
  { id: 'sec00-omnibody-hbf', name: 'OMNIBODY-HBF', iconName: 'Activity', color: 'bg-rose-500', description: 'Human Body Full Fidelity Simulation.' },
  { id: 'sec00-human-biocomp', name: 'HUMAN-BIOCOMP', iconName: 'Dna', color: 'bg-green-600', description: 'Affective Computing & State Management Kernel.' },
  { id: 'sec00-dual-haptic', name: 'DUAL-HAPTIC', iconName: 'Hand', color: 'bg-orange-600', description: 'Bidirectional Haptic I/O Engine.' },
  { id: 'sec00-e8-lattice', name: 'E8-LATTICE', iconName: 'Hexagon', color: 'bg-blue-600', description: 'Unified System Geometry & Coherence Field.' },
];

export default function ModuleRegistry({ profile, onInstall, onClose }: ModuleRegistryProps) {
  const [search, setSearch] = useState('');

  const filteredModules = AVAILABLE_MODULES.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="absolute inset-0 bg-zinc-950 text-white flex flex-col z-50">
      <div className="flex items-center p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </button>
        <h2 className="text-sm font-semibold ml-2">Module Registry</h2>
      </div>

      <div className="p-4 border-b border-zinc-800">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search modules..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10">
        {filteredModules.map(mod => {
          const isInstalled = profile.installedModules.some(m => m.id === mod.id);
          const Icon = (Icons as any)[mod.iconName] || Icons.Box;

          return (
            <div key={mod.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${mod.color} flex items-center justify-center shrink-0 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{mod.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{mod.description}</p>
                <button 
                  onClick={() => !isInstalled && onInstall({ id: mod.id, name: mod.name, iconName: mod.iconName, color: mod.color })}
                  disabled={isInstalled}
                  className={`mt-3 flex items-center justify-center w-full py-2 rounded-lg text-xs font-medium transition-colors ${
                    isInstalled 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isInstalled ? (
                    <><Check className="w-3 h-3 mr-1" /> Installed</>
                  ) : (
                    <><Download className="w-3 h-3 mr-1" /> Install</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
