import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { ChevronRight, Check, Bell, Globe, Target, Calendar, Database, Zap } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    language: 'en',
    notificationsEnabled: true,
    usageGoals: [],
    installedModules: [
      { id: 'organizer', name: 'Organizer', iconName: 'Calendar', color: 'bg-emerald-500' },
      { id: 'yog', name: 'Yog Nexus', iconName: 'Database', color: 'bg-blue-500' },
      { id: 'pruner', name: 'Pruner', iconName: 'Zap', color: 'bg-amber-500' },
      { id: 'autopython', name: 'AutoPython', iconName: 'Terminal', color: 'bg-purple-500' },
      { id: 'registry', name: 'Registry', iconName: 'Layers', color: 'bg-indigo-500' },
      { id: 'sigil', name: 'Obi Sigil', iconName: 'Hexagon', color: 'bg-rose-500' },
      { id: 'adlib', name: 'Ad-Lib', iconName: 'Wand2', color: 'bg-fuchsia-500' },
      { id: 'lore', name: 'Testament', iconName: 'BookOpen', color: 'bg-stone-500' },
      { id: 'profile', name: 'Profile', iconName: 'User', color: 'bg-zinc-700' },
    ]
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(profile);
  };

  const toggleGoal = (goal: string) => {
    setProfile(prev => ({
      ...prev,
      usageGoals: prev.usageGoals.includes(goal)
        ? prev.usageGoals.filter(g => g !== goal)
        : [...prev.usageGoals, goal]
    }));
  };

  const steps = [
    // Step 0: Welcome & Username
    <div key="step0" className="flex flex-col h-full justify-center space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome to DivineOS</h1>
        <p className="text-zinc-400">Initialize your presence in the system.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-zinc-300">Identify yourself</label>
        <input
          type="text"
          value={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          placeholder="Enter your username..."
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>
    </div>,

    // Step 1: Preferences
    <div key="step1" className="flex flex-col h-full justify-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">System Preferences</h2>
        <p className="text-zinc-400">Configure your interface parameters.</p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="flex items-center space-x-3 text-sm font-medium text-zinc-300">
            <Globe className="w-4 h-4" />
            <span>Preferred Language</span>
          </label>
          <select
            value={profile.language}
            onChange={(e) => setProfile({ ...profile, language: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
          >
            <option value="en">English (US)</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ja">日本語</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-700 rounded-xl">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-indigo-400" />
            <div>
              <p className="text-sm font-medium text-white">System Alerts</p>
              <p className="text-xs text-zinc-400">Receive notifications for tasks and optimizations</p>
            </div>
          </div>
          <button
            onClick={() => setProfile({ ...profile, notificationsEnabled: !profile.notificationsEnabled })}
            className={`w-12 h-6 rounded-full transition-colors relative ${profile.notificationsEnabled ? 'bg-indigo-500' : 'bg-zinc-700'}`}
          >
            <motion.div
              layout
              className="w-4 h-4 bg-white rounded-full absolute top-1"
              initial={false}
              animate={{ left: profile.notificationsEnabled ? '1.75rem' : '0.25rem' }}
            />
          </button>
        </div>
      </div>
    </div>,

    // Step 2: Usage Goals
    <div key="step2" className="flex flex-col h-full justify-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Primary Directives</h2>
        <p className="text-zinc-400">What are your main goals for DivineOS?</p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'scheduling', label: 'Task Scheduling & Workflow', icon: Calendar },
          { id: 'data', label: 'Data Integration & Retrieval', icon: Database },
          { id: 'optimization', label: 'System & Habit Optimization', icon: Zap },
          { id: 'metaprompting', label: 'Metaprompting & AI Agents', icon: Target },
        ].map((goal) => {
          const isSelected = profile.usageGoals.includes(goal.id);
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`w-full flex items-center p-4 rounded-xl border transition-all ${
                isSelected 
                  ? 'bg-indigo-500/20 border-indigo-500 text-white' 
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500'
              }`}
            >
              <goal.icon className={`w-5 h-5 mr-3 ${isSelected ? 'text-indigo-400' : 'text-zinc-500'}`} />
              <span className="text-sm font-medium">{goal.label}</span>
              {isSelected && <Check className="w-4 h-4 ml-auto text-indigo-400" />}
            </button>
          );
        })}
      </div>
    </div>,

    // Step 3: Feature Tour
    <div key="step3" className="flex flex-col h-full justify-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Core Modules</h2>
        <p className="text-zinc-400">Your OS is equipped with these primary kernels.</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Organizer (Scheduler)</h3>
            <p className="text-xs text-zinc-400 mt-1">Streamlines your workflows and manages your daily tasks with architectural precision.</p>
          </div>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Yog (Data Nexus)</h3>
            <p className="text-xs text-zinc-400 mt-1">The Akashic conduit for conversational data integration, retrieval, and memory anchoring.</p>
          </div>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Pruner (Optimization)</h3>
            <p className="text-xs text-zinc-400 mt-1">Your friendly agent that trims inefficiencies, refines habits, and optimizes system performance.</p>
          </div>
        </div>
      </div>
    </div>
  ];

  return (
    <div className="flex flex-col h-full bg-black text-white p-6">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pt-6 mt-auto flex items-center justify-between">
        <div className="flex space-x-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-indigo-500' : 'bg-zinc-800'}`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          disabled={step === 0 && !profile.username.trim()}
          className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors"
        >
          {step === 3 ? 'Initialize OS' : 'Continue'}
          {step < 3 && <ChevronRight className="w-4 h-4 ml-2" />}
        </button>
      </div>
    </div>
  );
}
