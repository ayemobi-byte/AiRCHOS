import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send, Terminal, Database, Cpu, ShieldAlert, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function ShadowAssistant({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'system', content: 'Integrative Shadow Assistant initialized. Data intake active. Context retrieval standing by.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate Agentic Workflow
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString() + 'sys1', role: 'system', content: '[Agent] Optimizing tokens... Context retrieved.' }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString() + 'ast', 
          role: 'assistant', 
          content: `Processed request: "${userMsg.content}". Data integrated. No critical problems detected.` 
        }]);
      }, 1000);
    }, 500);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="absolute inset-0 bg-zinc-950 text-white flex flex-col z-50 font-mono"
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </button>
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold font-sans">Shadow Assistant</h2>
        </div>
        <div className="w-9" />
      </div>

      {/* Agent Status Bar */}
      <div className="flex justify-between px-4 py-2 bg-black border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-wider">
        <div className="flex items-center space-x-1"><Database className="w-3 h-3 text-emerald-500" /> <span>Intake: OK</span></div>
        <div className="flex items-center space-x-1"><Terminal className="w-3 h-3 text-blue-500" /> <span>Ctx: Synced</span></div>
        <div className="flex items-center space-x-1"><Cpu className="w-3 h-3 text-purple-500" /> <span>Tokens: Opt</span></div>
        <div className="flex items-center space-x-1"><ShieldAlert className="w-3 h-3 text-amber-500" /> <span>Res: Idle</span></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-xl p-3 text-sm ${
              msg.role === 'user' ? 'bg-indigo-600 text-white font-sans' : 
              msg.role === 'system' ? 'bg-black border border-zinc-800 text-zinc-400 text-xs' :
              'bg-zinc-800 text-zinc-200 font-sans'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Prompt the Shadow..."
            className="flex-1 bg-black border border-zinc-800 rounded-full px-4 py-2 text-sm text-white font-sans focus:outline-none focus:border-indigo-500"
          />
          <button onClick={handleSend} className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
