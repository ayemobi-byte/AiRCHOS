import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Plus, Save, Database, Brain, FileOutput, Trash2, GripVertical, Download, ArrowDown } from 'lucide-react';

interface Block {
  id: string;
  type: 'source' | 'behavior' | 'output';
  content: string;
  params: string;
}

interface SavedPrompt {
  id: string;
  name: string;
  blocks: Block[];
}

const AVAILABLE_BLOCKS = [
  { type: 'source', content: 'Local File System (KabbalahFS)', icon: Database, color: 'text-blue-400' },
  { type: 'source', content: 'Live Web Search', icon: Database, color: 'text-blue-400' },
  { type: 'source', content: 'User Profile Context', icon: Database, color: 'text-blue-400' },
  { type: 'behavior', content: 'Summarize & Extract Entities', icon: Brain, color: 'text-purple-400' },
  { type: 'behavior', content: 'Analyze Security Vulnerabilities', icon: Brain, color: 'text-purple-400' },
  { type: 'behavior', content: 'Optimize for Narrative Coherence', icon: Brain, color: 'text-purple-400' },
  { type: 'behavior', content: 'Cross-Reference with Astro Data', icon: Brain, color: 'text-purple-400' },
  { type: 'output', content: 'Generate JSON Report', icon: FileOutput, color: 'text-emerald-400' },
  { type: 'output', content: 'Interactive Chat Session', icon: FileOutput, color: 'text-emerald-400' },
  { type: 'output', content: 'System Notification Alert', icon: FileOutput, color: 'text-emerald-400' },
];

export default function MetapromptDesigner({ onClose }: { onClose: () => void }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [promptName, setPromptName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('divineOS_metaprompts');
    if (saved) {
      try { setSavedPrompts(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const savePrompt = () => {
    if (!promptName.trim() || blocks.length === 0) return;
    const newPrompt: SavedPrompt = { id: Date.now().toString(), name: promptName, blocks };
    const updated = [...savedPrompts, newPrompt];
    setSavedPrompts(updated);
    localStorage.setItem('divineOS_metaprompts', JSON.stringify(updated));
    setPromptName('');
    setBlocks([]);
  };

  const loadPrompt = (p: SavedPrompt) => {
    // Ensure loaded blocks have params field for backward compatibility
    const loadedBlocks = p.blocks.map(b => ({ ...b, params: b.params || '' }));
    setBlocks(loadedBlocks);
    setPromptName(p.name);
  };

  const deletePrompt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updated);
    localStorage.setItem('divineOS_metaprompts', JSON.stringify(updated));
  };

  const exportJSON = () => {
    if (savedPrompts.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedPrompts, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "divineOS_metaprompts.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const addBlock = (template: any, insertIndex?: number) => {
    const newBlock: Block = { 
      id: Date.now().toString() + Math.random().toString(36).substring(2, 7), 
      type: template.type, 
      content: template.content,
      params: ''
    };
    
    if (insertIndex !== undefined) {
      const newBlocks = [...blocks];
      newBlocks.splice(insertIndex, 0, newBlock);
      setBlocks(newBlocks);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    setIsAdding(false);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlockParams = (id: string, params: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, params } : b));
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedIdx(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const newBlocks = [...blocks];
    const [draggedBlock] = newBlocks.splice(draggedIdx, 1);
    newBlocks.splice(index, 0, draggedBlock);
    setBlocks(newBlocks);
    setDraggedIdx(null);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="absolute inset-0 bg-zinc-950 text-zinc-200 flex flex-col z-50 font-sans"
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md z-20">
        <div className="flex items-center space-x-3">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-300" />
          </button>
          <h2 className="text-sm font-semibold">Metaprompt Designer</h2>
        </div>
        <button onClick={exportJSON} disabled={savedPrompts.length === 0} className="p-2 rounded-full hover:bg-zinc-800 disabled:opacity-30 transition-colors" title="Export to JSON">
          <Download className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Canvas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Active Chain</h3>
            <button onClick={() => setBlocks([])} className="text-xs text-red-400 hover:text-red-300">Clear</button>
          </div>
          
          <div className="bg-black border border-zinc-800 rounded-xl p-4 min-h-[200px] space-y-2">
            {blocks.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2 py-8">
                <Brain className="w-8 h-8 opacity-50" />
                <p className="text-xs">Add blocks to construct a metaprompt</p>
              </div>
            ) : (
              blocks.map((block, idx) => {
                const Icon = block.type === 'source' ? Database : block.type === 'behavior' ? Brain : FileOutput;
                const color = block.type === 'source' ? 'text-blue-400' : block.type === 'behavior' ? 'text-purple-400' : 'text-emerald-400';
                const borderColor = block.type === 'source' ? 'border-blue-900/50' : block.type === 'behavior' ? 'border-purple-900/50' : 'border-emerald-900/50';
                
                return (
                  <div 
                    key={block.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={(e) => handleDrop(e, idx)}
                    className="relative flex flex-col"
                  >
                    {/* Connecting Line from previous */}
                    {idx > 0 && (
                      <div className="flex flex-col items-center justify-center h-12 -my-2 z-0 relative">
                        <div className="w-0.5 h-full bg-gradient-to-b from-zinc-700 via-pink-500/50 to-zinc-700"></div>
                        <motion.div 
                          animate={{ y: [-15, 15] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                          className="absolute w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]"
                        />
                        <div className="absolute text-[10px] text-zinc-300 bg-zinc-900 px-2 py-0.5 border border-pink-500/30 rounded-full flex items-center space-x-1 shadow-sm z-10">
                          <span>Feeds into</span>
                          <ArrowDown className="w-3 h-3 text-pink-400" />
                        </div>
                      </div>
                    )}

                    <div className={`relative z-10 flex flex-col bg-zinc-900 border ${borderColor} p-3 rounded-lg shadow-lg transition-transform ${draggedIdx === idx ? 'opacity-50 scale-95' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className="cursor-grab active:cursor-grabbing p-1 hover:bg-zinc-800 rounded">
                          <GripVertical className="w-4 h-4 text-zinc-500" />
                        </div>
                        <Icon className={`w-4 h-4 ${color}`} />
                        <span className="text-sm font-medium flex-1">{block.content}</span>
                        <button onClick={() => removeBlock(block.id)} className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Editable Parameters */}
                      <div className="mt-3 pl-9 pr-2">
                        <input 
                          type="text"
                          value={block.params}
                          onChange={(e) => updateBlockParams(block.id, e.target.value)}
                          placeholder={block.type === 'source' ? "Keywords, path, or query..." : block.type === 'behavior' ? "Analysis parameters or instructions..." : "Output format details..."}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-300 focus:border-pink-500/50 outline-none transition-colors placeholder:text-zinc-700"
                        />
                      </div>

                      {/* Chain Selector */}
                      {block.type !== 'output' && (
                        <div className="mt-3 pl-9 pr-2 flex items-center space-x-2">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider shrink-0">Chain Next:</span>
                          <select 
                            className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-400 outline-none focus:border-pink-500/50"
                            onChange={(e) => {
                              if (e.target.value) {
                                addBlock(AVAILABLE_BLOCKS[parseInt(e.target.value)], idx + 1);
                                e.target.value = ""; // reset
                              }
                            }}
                          >
                            <option value="">-- Select subsequent block --</option>
                            {AVAILABLE_BLOCKS.map((b, i) => (
                              <option key={i} value={i}>{b.content}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {isAdding ? (
              <div className="mt-4 bg-zinc-900 border border-zinc-700 rounded-lg p-2 space-y-1">
                <div className="flex justify-between items-center px-2 pb-2 mb-2 border-b border-zinc-800">
                  <span className="text-xs font-medium text-zinc-400">Select Block</span>
                  <button onClick={() => setIsAdding(false)} className="text-xs text-zinc-500">Cancel</button>
                </div>
                {AVAILABLE_BLOCKS.map((b, i) => (
                  <button key={i} onClick={() => addBlock(b)} className="w-full flex items-center space-x-3 p-2 hover:bg-zinc-800 rounded text-left">
                    <b.icon className={`w-4 h-4 ${b.color}`} />
                    <span className="text-xs text-zinc-300">{b.content}</span>
                  </button>
                ))}
              </div>
            ) : (
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full mt-4 py-3 border-2 border-dashed border-zinc-800 rounded-lg text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-colors flex items-center justify-center space-x-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Block to End</span>
              </button>
            )}
          </div>

          {blocks.length > 0 && (
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={promptName}
                onChange={e => setPromptName(e.target.value)}
                placeholder="Name this metaprompt..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-pink-500 outline-none"
              />
              <button onClick={savePrompt} className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors">
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>

        {/* Saved Prompts */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Saved Metaprompts</h3>
          <div className="space-y-2">
            {savedPrompts.length === 0 ? (
              <p className="text-xs text-zinc-600 italic">No saved metaprompts yet.</p>
            ) : (
              savedPrompts.map(p => (
                <div key={p.id} onClick={() => loadPrompt(p)} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-pink-500/50 transition-colors">
                  <div>
                    <div className="text-sm font-medium text-zinc-200">{p.name}</div>
                    <div className="text-xs text-zinc-500">{p.blocks.length} blocks</div>
                  </div>
                  <button onClick={(e) => deletePrompt(p.id, e)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-full transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
