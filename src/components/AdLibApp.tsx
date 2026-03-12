import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Copy, Check, ChevronDown } from 'lucide-react';

interface AdLibAppProps {
  onClose: () => void;
}

const TEMPLATES = {
  custom: { name: 'Custom', role: 'Systems Architect', logic: 'GUTE', shell: 'Architectural', functionName: 'Cognitive' },
  security: { name: 'Security Auditor', role: 'Security Auditor', logic: 'Zero-Trust', shell: 'Defensive', functionName: 'Validation' },
  narrative: { name: 'Narrative Director', role: 'Narrative Director', logic: 'Mythopoeic', shell: 'Thematic', functionName: 'Storytelling' },
  performance: { name: 'Performance Optimizer', role: 'Performance Optimizer', logic: 'Lean', shell: 'Efficiency', functionName: 'Optimization' }
};

const ANALYSIS_TYPES = ['General Synthesis', 'Security Audit', 'Performance Review', 'Narrative Coherence'];

export default function AdLibApp({ onClose }: AdLibAppProps) {
  const [activeTemplate, setActiveTemplate] = useState<keyof typeof TEMPLATES>('custom');
  const [analysisType, setAnalysisType] = useState(ANALYSIS_TYPES[0]);
  
  const [project, setProject] = useState('DivineOS');
  const [framework, setFramework] = useState('META');
  const [logic, setLogic] = useState(TEMPLATES.custom.logic);
  const [shell, setShell] = useState(TEMPLATES.custom.shell);
  const [functionName, setFunctionName] = useState(TEMPLATES.custom.functionName);
  const [vectorAction, setVectorAction] = useState('enhance');
  const [collectiveAction, setCollectiveAction] = useState('unify');
  const [goal, setGoal] = useState('Absolute Harmony');

  const [copied, setCopied] = useState(false);

  const handleTemplateChange = (key: keyof typeof TEMPLATES) => {
    setActiveTemplate(key);
    setLogic(TEMPLATES[key].logic);
    setShell(TEMPLATES[key].shell);
    setFunctionName(TEMPLATES[key].functionName);
  };

  const getAnalysisSection = () => {
    switch(analysisType) {
      case 'Security Audit':
        return `4. Security Audit: Identify potential vulnerabilities within the ${shell} shells and propose defensive countermeasures.`;
      case 'Performance Review':
        return `4. Performance Review: Analyze the computational overhead of the ${functionName} functions and suggest optimizations.`;
      case 'Narrative Coherence':
        return `4. Narrative Coherence: Ensure the thematic alignment of the ${logic} logic with the overarching mythos of ${project}.`;
      default:
        return `4. Coherence Score: Rate how well the concepts align with the goal of '${goal}'.`;
    }
  };

  const generatedPrompt = `Act as a ${TEMPLATES[activeTemplate].role} for the ${project} project. I need you to perform a Comprehensive Extraction and Coherence Analysis of this entire conversation to integrate it into our ${framework} master framework.

Please provide the following:
1. ${logic} Extraction: Identify any methods, resources, or strategies discussed that function within the ${logic} logic.
2. Structural Mapping: Classify discussed entities as either ${shell} shells (external fronts) or ${functionName} functions (internal freedom).
3. ${logic} Vectors: Identify how the ideas in this chat can ${vectorAction} or utilize existing systems to ${collectiveAction} the collective.
${getAnalysisSection()}
5. Synthesis: Provide a 3-paragraph summary of this chat's core themes and how it can be actualized within the ${framework}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <h2 className="text-sm font-semibold">Ad-Lib System Template</h2>
        <button onClick={handleCopy} className="p-2 -mr-2 rounded-full hover:bg-zinc-800 transition-colors text-fuchsia-400">
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Role Template</label>
              <div className="relative">
                <select 
                  value={activeTemplate} 
                  onChange={e => handleTemplateChange(e.target.value as keyof typeof TEMPLATES)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none appearance-none"
                >
                  {Object.entries(TEMPLATES).map(([k, v]) => (
                    <option key={k} value={k}>{v.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Analysis Type</label>
              <div className="relative">
                <select 
                  value={analysisType} 
                  onChange={e => setAnalysisType(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none appearance-none"
                >
                  {ANALYSIS_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Project Name</label>
              <input type="text" value={project} onChange={e => setProject(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Master Framework</label>
              <input type="text" value={framework} onChange={e => setFramework(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Core Logic</label>
              <input type="text" value={logic} onChange={e => setLogic(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Shell Type</label>
              <input type="text" value={shell} onChange={e => setShell(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Function Type</label>
              <input type="text" value={functionName} onChange={e => setFunctionName(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500">Goal</label>
              <input type="text" value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-fuchsia-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <h3 className="text-xs font-semibold text-fuchsia-400 mb-2 uppercase tracking-wider">Generated Prompt</h3>
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">
            {generatedPrompt}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
