import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Folder, Activity, FileCode, Cpu } from 'lucide-react';

const SEPHIROT = [
  { 
    id: 'keter', name: 'Keter', desc: 'Root Crown / Core Kernel', top: '10%', left: '50%', 
    daemons: ['Aleph_Daemon (to Chokhmah)', 'Bet_Daemon (to Binah)', 'Gimel_Daemon (to Tiferet)'],
    files: [{ name: 'kernel.sys', size: '4.2 MB' }, { name: 'boot.ini', size: '12 KB' }],
    processes: [{ pid: 1, name: 'init_crown', cpu: '0.1%' }]
  },
  { 
    id: 'chokhmah', name: 'Chokhmah', desc: 'Wisdom / Raw Data', top: '25%', left: '75%', 
    daemons: ['Dalet_Daemon (to Binah)', 'Heh_Daemon (to Tiferet)', 'Vav_Daemon (to Chesed)'],
    files: [{ name: 'raw_stream.dat', size: '1.2 GB' }],
    processes: [{ pid: 42, name: 'data_ingest', cpu: '14.2%' }]
  },
  { 
    id: 'binah', name: 'Binah', desc: 'Understanding / Processing', top: '25%', left: '25%', 
    daemons: ['Zayin_Daemon (to Tiferet)', 'Chet_Daemon (to Gevurah)'],
    files: [{ name: 'parser.exe', size: '840 KB' }, { name: 'logic_tree.xml', size: '45 KB' }],
    processes: [{ pid: 108, name: 'analyzer_thread', cpu: '45.0%' }]
  },
  { 
    id: 'chesed', name: 'Chesed', desc: 'Mercy / Expansion Logs', top: '45%', left: '75%', 
    daemons: ['Tet_Daemon (to Gevurah)', 'Yod_Daemon (to Tiferet)', 'Kaf_Daemon (to Netzach)'],
    files: [{ name: 'expansion.log', size: '500 MB' }],
    processes: [{ pid: 210, name: 'log_writer', cpu: '2.4%' }]
  },
  { 
    id: 'gevurah', name: 'Gevurah', desc: 'Severity / Security & Limits', top: '45%', left: '25%', 
    daemons: ['Lamed_Daemon (to Tiferet)', 'Mem_Daemon (to Hod)'],
    files: [{ name: 'firewall.rules', size: '12 KB' }, { name: 'quarantine.dir', size: '0 B' }],
    processes: [{ pid: 999, name: 'sec_monitor', cpu: '8.1%' }]
  },
  { 
    id: 'tiferet', name: 'Tiferet', desc: 'Beauty / Central Hub', top: '55%', left: '50%', 
    daemons: ['Nun_Daemon (to Netzach)', 'Samekh_Daemon (to Yesod)', 'Ayin_Daemon (to Hod)'],
    files: [{ name: 'hub_config.json', size: '4 KB' }, { name: 'balance.sys', size: '1.1 MB' }],
    processes: [{ pid: 500, name: 'core_router', cpu: '12.5%' }]
  },
  { 
    id: 'netzach', name: 'Netzach', desc: 'Eternity / Persistent State', top: '70%', left: '75%', 
    daemons: ['Pe_Daemon (to Hod)', 'Tzadi_Daemon (to Yesod)', 'Qof_Daemon (to Malkuth)'],
    files: [{ name: 'state.db', size: '2.4 GB' }],
    processes: [{ pid: 777, name: 'db_sync', cpu: '5.5%' }]
  },
  { 
    id: 'hod', name: 'Hod', desc: 'Splendor / Ephemeral Cache', top: '70%', left: '25%', 
    daemons: ['Resh_Daemon (to Yesod)', 'Shin_Daemon (to Malkuth)'],
    files: [{ name: 'temp_cache.bin', size: '450 MB' }],
    processes: [{ pid: 888, name: 'cache_manager', cpu: '3.2%' }]
  },
  { 
    id: 'yesod', name: 'Yesod', desc: 'Foundation / API Gateway', top: '85%', left: '50%', 
    daemons: ['Tav_Daemon (to Malkuth)'],
    files: [{ name: 'routes.yaml', size: '18 KB' }, { name: 'gateway.exe', size: '2.2 MB' }],
    processes: [{ pid: 3000, name: 'api_listener', cpu: '1.0%' }]
  },
  { 
    id: 'malkuth', name: 'Malkuth', desc: 'Kingdom / User Interface', top: '95%', left: '50%', 
    daemons: [],
    files: [{ name: 'ui_render.js', size: '1.5 MB' }, { name: 'styles.css', size: '200 KB' }],
    processes: [{ pid: 8080, name: 'display_server', cpu: '18.4%' }]
  },
];

export default function KabbalahFS({ onClose }: { onClose: () => void }) {
  const [activeNode, setActiveNode] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'daemons' | 'files' | 'processes'>('daemons');

  return (
    <motion.div 
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="absolute inset-0 bg-stone-950 text-stone-200 flex flex-col z-50 font-serif"
    >
      <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-900/50 backdrop-blur-md z-20">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-stone-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-stone-300" />
        </button>
        <h2 className="text-sm font-semibold font-sans">Kabbalistic FS</h2>
        <div className="w-9" />
      </div>

      <div className="flex-1 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 to-black">
        {/* Tree visualization */}
        <div className="absolute inset-0 p-8">
          <div className="relative w-full h-full max-w-xs mx-auto">
            {/* Draw Paths (Simplified as background lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <line x1="50%" y1="10%" x2="75%" y2="25%" stroke="#444" strokeWidth="2" />
              <line x1="50%" y1="10%" x2="25%" y2="25%" stroke="#444" strokeWidth="2" />
              <line x1="75%" y1="25%" x2="25%" y2="25%" stroke="#444" strokeWidth="2" />
              <line x1="50%" y1="10%" x2="50%" y2="55%" stroke="#444" strokeWidth="2" />
              <line x1="75%" y1="25%" x2="75%" y2="45%" stroke="#444" strokeWidth="2" />
              <line x1="25%" y1="25%" x2="25%" y2="45%" stroke="#444" strokeWidth="2" />
              <line x1="75%" y1="45%" x2="50%" y2="55%" stroke="#444" strokeWidth="2" />
              <line x1="25%" y1="45%" x2="50%" y2="55%" stroke="#444" strokeWidth="2" />
              <line x1="50%" y1="55%" x2="75%" y2="70%" stroke="#444" strokeWidth="2" />
              <line x1="50%" y1="55%" x2="25%" y2="70%" stroke="#444" strokeWidth="2" />
              <line x1="75%" y1="70%" x2="50%" y2="85%" stroke="#444" strokeWidth="2" />
              <line x1="25%" y1="70%" x2="50%" y2="85%" stroke="#444" strokeWidth="2" />
              <line x1="50%" y1="85%" x2="50%" y2="95%" stroke="#444" strokeWidth="2" />
            </svg>

            {/* Draw Sephirot */}
            {SEPHIROT.map(node => (
              <button
                key={node.id}
                className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-stone-900 border-2 border-stone-600 flex items-center justify-center hover:border-amber-500 hover:bg-stone-800 transition-all z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                style={{ top: node.top, left: node.left }}
                onClick={() => { setActiveNode(node); setActiveTab('daemons'); }}
              >
                <Folder className="w-5 h-5 text-stone-400" />
                <span className="absolute top-full mt-1 text-[10px] font-bold text-stone-500 uppercase tracking-widest font-sans">{node.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {activeNode && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 bg-stone-900/95 border border-stone-700 p-4 rounded-xl backdrop-blur-md z-20 font-sans max-h-[50%] flex flex-col"
            >
              <div className="flex justify-between items-start mb-2 shrink-0">
                <div>
                  <h3 className="text-lg font-bold text-amber-500">{activeNode.name}</h3>
                  <p className="text-xs text-stone-400">{activeNode.desc}</p>
                </div>
                <button onClick={() => setActiveNode(null)} className="text-stone-500 hover:text-stone-300 text-xs">Close</button>
              </div>
              
              <div className="flex space-x-2 mb-3 shrink-0 border-b border-stone-800 pb-2">
                <button onClick={() => setActiveTab('daemons')} className={`text-xs px-2 py-1 rounded ${activeTab === 'daemons' ? 'bg-stone-800 text-stone-200' : 'text-stone-500'}`}>Daemons</button>
                <button onClick={() => setActiveTab('files')} className={`text-xs px-2 py-1 rounded ${activeTab === 'files' ? 'bg-stone-800 text-stone-200' : 'text-stone-500'}`}>Files</button>
                <button onClick={() => setActiveTab('processes')} className={`text-xs px-2 py-1 rounded ${activeTab === 'processes' ? 'bg-stone-800 text-stone-200' : 'text-stone-500'}`}>Processes</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {activeTab === 'daemons' && (
                  activeNode.daemons && activeNode.daemons.length > 0 ? (
                    activeNode.daemons.map((daemon: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-stone-400 bg-black/50 p-2 rounded">
                        <Activity className="w-3 h-3 text-emerald-500" />
                        <span>{daemon}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-stone-600 italic">No outgoing daemons</div>
                  )
                )}

                {activeTab === 'files' && (
                  activeNode.files && activeNode.files.length > 0 ? (
                    activeNode.files.map((file: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-stone-400 bg-black/50 p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <FileCode className="w-3 h-3 text-blue-400" />
                          <span>{file.name}</span>
                        </div>
                        <span className="text-stone-600">{file.size}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-stone-600 italic">No files found</div>
                  )
                )}

                {activeTab === 'processes' && (
                  activeNode.processes && activeNode.processes.length > 0 ? (
                    activeNode.processes.map((proc: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-stone-400 bg-black/50 p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <Cpu className="w-3 h-3 text-purple-400" />
                          <span>{proc.name} (PID: {proc.pid})</span>
                        </div>
                        <span className="text-stone-500">{proc.cpu} CPU</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-stone-600 italic">No active processes</div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
