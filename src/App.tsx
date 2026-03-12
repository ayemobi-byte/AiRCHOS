import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { UserProfile, AppState } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';
import Onboarding from './components/Onboarding';
import Desktop from './components/Desktop';
import ProfileApp from './components/ProfileApp';
import RegistryApp from './components/RegistryApp';
import AdLibApp from './components/AdLibApp';
import SigilApp from './components/SigilApp';
import LoreApp from './components/LoreApp';
import RelationalMatrixApp from './components/RelationalMatrixApp';
import ShadowAssistant from './components/ShadowAssistant';
import KabbalahFS from './components/KabbalahFS';
import AstroCharts from './components/AstroCharts';
import MetapromptDesigner from './components/MetapromptDesigner';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('divineOS_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      username: '',
      language: 'en',
      notificationsEnabled: true,
      usageGoals: [],
      installedModules: []
    };
  });

  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('divineOS_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.username) return 'desktop';
      } catch (e) {}
    }
    return 'onboarding';
  });

  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('divineOS_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('desktop');
  };

  const handleOpenApp = (appId: string) => {
    setActiveApp(appId);
    setAppState('app');
  };

  const handleCloseApp = () => {
    setActiveApp(null);
    setAppState('desktop');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[400px] h-[850px] max-h-[90vh] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-zinc-900 ring-1 ring-zinc-800">
        
        {/* Hardware Notch/Island */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
        </div>

        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {appState === 'onboarding' && (
              <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />
            )}

            {appState === 'desktop' && (
              <Desktop key="desktop" profile={userProfile} onOpenApp={handleOpenApp} />
            )}

            {appState === 'app' && activeApp === 'profile' && (
              <ProfileApp 
                key="profile" 
                profile={userProfile} 
                onSave={setUserProfile} 
                onClose={handleCloseApp} 
              />
            )}

            {appState === 'app' && activeApp === 'registry' && (
              <RegistryApp 
                key="registry" 
                profile={userProfile} 
                onUpdateProfile={setUserProfile} 
                onClose={handleCloseApp} 
              />
            )}

            {appState === 'app' && activeApp === 'adlib' && (
              <AdLibApp key="adlib" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'sigil' && (
              <SigilApp key="sigil" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'lore' && (
              <LoreApp key="lore" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'matrix' && (
              <RelationalMatrixApp key="matrix" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'shadow' && (
              <ShadowAssistant key="shadow" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'kabbalah' && (
              <KabbalahFS key="kabbalah" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'astro' && (
              <AstroCharts key="astro" onClose={handleCloseApp} />
            )}

            {appState === 'app' && activeApp === 'metaprompt' && (
              <MetapromptDesigner key="metaprompt" onClose={handleCloseApp} />
            )}

            {/* Placeholder for other apps */}
            {appState === 'app' && !['profile', 'registry', 'adlib', 'sigil', 'lore', 'matrix', 'shadow', 'kabbalah', 'astro', 'metaprompt'].includes(activeApp || '') && (
              <div key="placeholder" className="absolute inset-0 bg-black text-white flex flex-col items-center justify-center">
                <p className="text-zinc-500 mb-4">Module '{activeApp}' is offline.</p>
                <button 
                  onClick={handleCloseApp}
                  className="px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
                >
                  Return to Desktop
                </button>
              </div>
            )}
          </AnimatePresence>
        </ErrorBoundary>

        {/* Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-1/3 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
