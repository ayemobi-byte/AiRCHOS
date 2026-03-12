import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Star, Globe, Loader2, User } from 'lucide-react';

export default function AstroCharts({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'natal' | 'composite' | 'forecasts'>('natal');
  const [loading, setLoading] = useState(true);
  const [astroData, setAstroData] = useState<any>(null);
  
  const [natalInput, setNatalInput] = useState('OBI:11281996:0423@DERIDDER,LA,USA');
  const [parsedNatal, setParsedNatal] = useState<any>(null);
  const [natalError, setNatalError] = useState('');

  useEffect(() => {
    // Simulate fetching real ephemeris data
    const fetchAstroData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate dynamic data based on current date to simulate real ephemeris
      const today = new Date();
      const seed = today.getDate() + today.getMonth() * 31;
      
      const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
      const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
      const aspects = ['Trine', 'Square', 'Conjunction', 'Opposition', 'Sextile'];
      
      const currentPlutoSign = signs[(10 + Math.floor(seed / 10)) % 12]; // Roughly Aquarius right now
      
      setAstroData({
        resonance: 70 + (seed % 25),
        aspects: [
          { name: `${planets[seed % 10]} ${aspects[seed % 5]} ${planets[(seed + 3) % 10]}`, type: seed % 2 === 0 ? 'Harmonious' : 'Friction' },
          { name: `${planets[(seed + 1) % 10]} ${aspects[(seed + 1) % 5]} ${planets[(seed + 4) % 10]}`, type: seed % 3 === 0 ? 'Harmonious' : 'Friction' }
        ],
        global: {
          title: `Pluto in ${currentPlutoSign}`,
          desc: `Pluto's transit through ${currentPlutoSign} signals a massive shift in community structures and technological integration. Expect rapid developments in decentralized networks today.`,
          impact: seed % 2 === 0 ? 'High' : 'Critical',
          duration: 'Long-term Transit'
        },
        local: {
          title: `Lunar Phase: ${['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'][seed % 4]}`,
          desc: `Current lunar phase supports ${['introspective group work', 'active manifestation', 'release and letting go', 'planning and strategy'][seed % 4]}. Ideal time for shadow integration.`,
          focus: ['Shadow Work', 'Action', 'Release', 'Planning'][seed % 4],
          peak: 'Active Now'
        }
      });
      setLoading(false);
    };

    fetchAstroData();
  }, []);

  const handleParseNatal = () => {
    setNatalError('');
    // Format: NAME:MMDDYYYY:HHMM@LOCATION
    const regex = /^([^:]+):(\d{2})(\d{2})(\d{4}):(\d{2})(\d{2})@(.+)$/;
    const match = natalInput.match(regex);

    if (match) {
      const [_, name, month, day, year, hour, minute, location] = match;
      
      // Calculate Sun Sign
      const m = parseInt(month);
      const d = parseInt(day);
      let sunSign = 'Unknown';
      if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) sunSign = 'Aries';
      else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) sunSign = 'Taurus';
      else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) sunSign = 'Gemini';
      else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) sunSign = 'Cancer';
      else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) sunSign = 'Leo';
      else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) sunSign = 'Virgo';
      else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) sunSign = 'Libra';
      else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) sunSign = 'Scorpio';
      else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) sunSign = 'Sagittarius';
      else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) sunSign = 'Capricorn';
      else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) sunSign = 'Aquarius';
      else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) sunSign = 'Pisces';

      // Deterministic pseudo-random for Moon and Rising based on input string
      const seed = name.length + parseInt(year) + parseInt(hour) + location.length;
      const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
      const moonSign = signs[seed % 12];
      const risingSign = signs[(seed * 3) % 12];

      setParsedNatal({
        name,
        date: `${month}/${day}/${year}`,
        time: `${hour}:${minute}`,
        location,
        sunSign,
        moonSign,
        risingSign
      });
    } else {
      setNatalError('Invalid format. Use NAME:MMDDYYYY:HHMM@CITY,STATE,COUNTRY');
    }
  };

  return (
    <motion.div 
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="absolute inset-0 bg-indigo-950 text-indigo-100 flex flex-col z-50 font-sans"
    >
      <div className="flex items-center justify-between p-4 border-b border-indigo-900/50 bg-black/50 backdrop-blur-md z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-indigo-900/50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-indigo-300" />
        </button>
        <h2 className="text-sm font-semibold">Astro Dynamics</h2>
        <div className="w-9" />
      </div>

      <div className="flex p-2 bg-black/50 overflow-x-auto scrollbar-hide">
        <button 
          onClick={() => setActiveTab('natal')}
          className={`flex-none px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'natal' ? 'bg-indigo-600 text-white' : 'text-indigo-400 hover:bg-indigo-900/30'}`}
        >
          Natal Chart
        </button>
        <button 
          onClick={() => setActiveTab('composite')}
          className={`flex-none px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'composite' ? 'bg-indigo-600 text-white' : 'text-indigo-400 hover:bg-indigo-900/30'}`}
        >
          Composite
        </button>
        <button 
          onClick={() => setActiveTab('forecasts')}
          className={`flex-none px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === 'forecasts' ? 'bg-indigo-600 text-white' : 'text-indigo-400 hover:bg-indigo-900/30'}`}
        >
          Forecasts
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 text-indigo-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="text-xs animate-pulse">Syncing Ephemeris Data...</p>
          </div>
        ) : activeTab === 'natal' ? (
          <div className="space-y-4">
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-indigo-100 mb-2">Natal Data Input</h3>
              <p className="text-xs text-indigo-400 mb-3">Format: NAME:MMDDYYYY:HHMM@CITY,STATE,COUNTRY</p>
              <input 
                type="text" 
                value={natalInput}
                onChange={(e) => setNatalInput(e.target.value)}
                className="w-full bg-black/50 border border-indigo-500/50 rounded-lg px-3 py-2 text-sm text-indigo-200 focus:outline-none focus:border-indigo-400 mb-3 font-mono"
                placeholder="e.g. OBI:11281996:0423@DERIDDER,LA,USA"
              />
              <button 
                onClick={handleParseNatal}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Calculate Chart
              </button>
              {natalError && <p className="text-xs text-red-400 mt-2">{natalError}</p>}
            </div>

            {parsedNatal && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 space-y-4"
              >
                <div className="flex items-center space-x-3 border-b border-indigo-800/50 pb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-800/50 flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-100">{parsedNatal.name}</h3>
                    <p className="text-xs text-indigo-400">{parsedNatal.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-black/40 p-2 rounded-lg">
                    <span className="block text-[10px] text-indigo-500 uppercase">Date of Birth</span>
                    <span className="text-indigo-200">{parsedNatal.date}</span>
                  </div>
                  <div className="bg-black/40 p-2 rounded-lg">
                    <span className="block text-[10px] text-indigo-500 uppercase">Time of Birth</span>
                    <span className="text-indigo-200">{parsedNatal.time}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Core Placements</h4>
                  <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg text-sm">
                    <span className="text-amber-400 flex items-center gap-2"><Star className="w-3 h-3"/> Sun</span>
                    <span className="text-indigo-100 font-medium">{parsedNatal.sunSign}</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg text-sm">
                    <span className="text-blue-300 flex items-center gap-2"><Globe className="w-3 h-3"/> Moon</span>
                    <span className="text-indigo-100 font-medium">{parsedNatal.moonSign}</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/40 p-2 rounded-lg text-sm">
                    <span className="text-emerald-400 flex items-center gap-2"><ArrowLeft className="w-3 h-3 rotate-45"/> Ascendant</span>
                    <span className="text-indigo-100 font-medium">{parsedNatal.risingSign}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : activeTab === 'composite' ? (
          <div className="space-y-6">
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
              {/* Mock Chart Visualization */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
              <div className="w-32 h-32 rounded-full border border-indigo-400/50 flex items-center justify-center relative">
                <div className="w-24 h-24 rounded-full border border-indigo-400/30 flex items-center justify-center">
                  <Star className="w-8 h-8 text-amber-400" />
                </div>
                {/* Mock planetary nodes */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                  <div className="absolute bottom-4 right-0 w-3 h-3 bg-red-400 rounded-full shadow-[0_0_10px_#f87171]" />
                </motion.div>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                  <div className="absolute bottom-4 left-0 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]" />
                </motion.div>
              </div>
              <p className="mt-6 text-sm font-medium text-indigo-200 z-10">Advanced Composite Synastry</p>
              <p className="text-xs text-indigo-400 mt-1 z-10">Group dynamic resonance: {astroData?.resonance}%</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Active Aspects</h3>
              {astroData?.aspects.map((aspect: any, i: number) => (
                <div key={i} className="bg-black/40 rounded-lg p-3 text-sm flex justify-between items-center">
                  <span>{aspect.name}</span>
                  <span className={aspect.type === 'Harmonious' ? 'text-emerald-400' : 'text-red-400'}>{aspect.type}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-indigo-100">{astroData?.global.title}</h3>
              </div>
              <p className="text-xs text-indigo-300 leading-relaxed mb-4">
                {astroData?.global.desc}
              </p>
              <div className="flex items-center justify-between text-xs text-indigo-400 border-t border-indigo-800/50 pt-3">
                <span>Impact: {astroData?.global.impact}</span>
                <span>Duration: {astroData?.global.duration}</span>
              </div>
            </div>

            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="font-semibold text-indigo-100">{astroData?.local.title}</h3>
              </div>
              <p className="text-xs text-indigo-300 leading-relaxed mb-4">
                {astroData?.local.desc}
              </p>
              <div className="flex items-center justify-between text-xs text-indigo-400 border-t border-indigo-800/50 pt-3">
                <span>Focus: {astroData?.local.focus}</span>
                <span>Peak: {astroData?.local.peak}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
