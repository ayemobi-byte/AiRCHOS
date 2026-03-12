import React from 'react';
import { motion } from 'motion/react';
import { UserProfile, InstalledModule } from '../types';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';

interface RegistryAppProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onClose: () => void;
}

export const AVAILABLE_MODULES: InstalledModule[] = [
  { id: 'organizer', name: 'Organizer', iconName: 'Calendar', color: 'bg-emerald-500' },
  { id: 'yog', name: 'Yog Nexus', iconName: 'Database', color: 'bg-blue-500' },
  { id: 'pruner', name: 'Pruner', iconName: 'Zap', color: 'bg-amber-500' },
  { id: 'autopython', name: 'AutoPython', iconName: 'Terminal', color: 'bg-purple-500' },
  { id: 'registry', name: 'Registry', iconName: 'Layers', color: 'bg-indigo-500' },
  { id: 'sigil', name: 'Obi Sigil', iconName: 'Hexagon', color: 'bg-rose-500' },
  { id: 'adlib', name: 'Ad-Lib', iconName: 'Wand2', color: 'bg-fuchsia-500' },
  { id: 'lore', name: 'Testament', iconName: 'BookOpen', color: 'bg-stone-500' },
  { id: 'matrix', name: 'Relational Matrix', iconName: 'Network', color: 'bg-cyan-500' },
  { id: 'shadow', name: 'Shadow Assistant', iconName: 'Sparkles', color: 'bg-indigo-600' },
  { id: 'kabbalah', name: 'Kabbalah FS', iconName: 'Network', color: 'bg-stone-600' },
  { id: 'astro', name: 'Astro Dynamics', iconName: 'Star', color: 'bg-purple-600' },
  { id: 'metaprompt', name: 'Metaprompt Designer', iconName: 'Workflow', color: 'bg-pink-600' },
  { id: 'profile', name: 'Profile', iconName: 'User', color: 'bg-zinc-700' },
];

export default function RegistryApp({ profile, onUpdateProfile, onClose }: RegistryAppProps) {
  const isInstalled = (id: string) => profile.installedModules.some(m => m.id === id);

  const toggleModule = (module: InstalledModule) => {
    if (module.id === 'registry' || module.id === 'profile') return; // Prevent uninstalling core

    let newModules;
    if (isInstalled(module.id)) {
      newModules = profile.installedModules.filter(m => m.id !== module.id);
    } else {
      newModules = [...profile.installedModules, module];
    }
    onUpdateProfile({ ...profile, installedModules: newModules });
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-black text-white flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </button>
        <h2 className="text-sm font-semibold">Module Registry</h2>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {AVAILABLE_MODULES.map((module) => {
          const Icon = (Icons as any)[module.iconName] || Icons.Box;
          const installed = isInstalled(module.id);
          const isCore = module.id === 'registry' || module.id === 'profile';

          return (
            <div key={module.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{module.name}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {isCore ? 'Core System Module' : installed ? 'Installed' : 'Available'}
                  </p>
                </div>
              </div>
              
              {!isCore && (
                <button
                  onClick={() => toggleModule(module)}
                  className={`p-2 rounded-full transition-colors ${
                    installed 
                      ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                      : 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20'
                  }`}
                >
                  {installed ? <Trash2 className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
