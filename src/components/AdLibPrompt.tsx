import React, { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';

export default function AdLibPrompt({ onClose }: { onClose: () => void }) {
  const [project, setProject] = useState('DivineOS');
  const [copied, setCopied] = useState(false);

  const prompt = `Act as a Systems Architect for the ${project} project. I need you to perform a Comprehensive Extraction and Coherence Analysis of this entire conversation to integrate it into our ${project} master framework.

Please provide the following:
1. ${project} Extraction: Identify any methods, resources, or strategies discussed that function within the ${project} logic.
2. Structural Mapping: Classify discussed entities as either ${project} shells (external fronts) or ${project} functions (internal freedom).
3. ${project} Vectors: Identify how the ideas in this chat can ${project} or utilize existing systems to ${project} the collective.
4. Coherence Score: Rate how well the concepts in this chat align with:
   - ${project} / ${project}.
   - ${project} without ${project}.
   - The goal of '${project}.'
5. Synthesis: Provide a 3-paragraph summary of this chat's '${project}' and how it can be actualized within the ${project}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute inset-0 bg-zinc-950 text-white flex flex-col z-50">
      <div className="flex items-center p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </button>
        <h2 className="text-sm font-semibold ml-2">Ad-Lib System Template</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Project Name</label>
          <input 
            type="text" 
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
          />
        </div>

        <div className="space-y-2 relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-400">Generated Meta-Prompt</label>
            <button onClick={handleCopy} className="text-xs flex items-center text-fuchsia-400 hover:text-fuchsia-300">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 whitespace-pre-wrap font-mono">
            {prompt}
          </div>
        </div>
      </div>
    </div>
  );
}
