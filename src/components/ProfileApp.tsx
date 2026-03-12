import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import { ArrowLeft, Save, Globe, Bell, Target } from 'lucide-react';

interface ProfileAppProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

export default function ProfileApp({ profile: initialProfile, onSave, onClose }: ProfileAppProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const toggleGoal = (goal: string) => {
    setProfile(prev => ({
      ...prev,
      usageGoals: prev.usageGoals.includes(goal)
        ? prev.usageGoals.filter(g => g !== goal)
        : [...prev.usageGoals, goal]
    }));
  };

  const handleSave = () => {
    onSave(profile);
    onClose();
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
        <h2 className="text-sm font-semibold">User Profile</h2>
        <button onClick={handleSave} className="p-2 -mr-2 rounded-full hover:bg-zinc-800 transition-colors text-indigo-400">
          <Save className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Username */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Identity</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Preferences</label>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium">Language</span>
              </div>
              <select
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                className="bg-transparent text-sm text-zinc-300 focus:outline-none text-right"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <button
                onClick={() => setProfile({ ...profile, notificationsEnabled: !profile.notificationsEnabled })}
                className={`w-10 h-5 rounded-full transition-colors relative ${profile.notificationsEnabled ? 'bg-indigo-500' : 'bg-zinc-700'}`}
              >
                <motion.div
                  layout
                  className="w-3 h-3 bg-white rounded-full absolute top-1"
                  initial={false}
                  animate={{ left: profile.notificationsEnabled ? '1.375rem' : '0.25rem' }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Directives</label>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
            {[
              { id: 'scheduling', label: 'Task Scheduling' },
              { id: 'data', label: 'Data Integration' },
              { id: 'optimization', label: 'System Optimization' },
              { id: 'metaprompting', label: 'Metaprompting' },
            ].map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Target className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-medium">{goal.label}</span>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  profile.usageGoals.includes(goal.id) ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-600'
                }`}>
                  {profile.usageGoals.includes(goal.id) && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
