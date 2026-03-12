import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserProfile } from '../types';
import * as Icons from 'lucide-react';

interface DesktopProps {
  profile: UserProfile;
  onOpenApp: (appId: string) => void;
}

export default function Desktop({ profile, onOpenApp }: DesktopProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-black text-white relative overflow-hidden">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-3 text-xs font-medium text-zinc-400 z-10">
        <span>DivineOS</span>
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      {/* Greeting */}
      <div className="px-6 pt-8 pb-6 z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Welcome, {profile.username || 'Architect'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-500 mt-1"
        >
          All systems nominal.
        </motion.p>
      </div>

      {/* App Grid */}
      <div className="flex-1 px-6 z-10 overflow-y-auto pb-10">
        <div className="grid grid-cols-3 gap-y-8 gap-x-6">
          {profile.installedModules.map((app, index) => {
            const Icon = (Icons as any)[app.iconName] || Icons.Box;
            return (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center space-y-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-medium text-zinc-300 text-center leading-tight line-clamp-2">{app.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />
    </div>
  );
}
