'use client'
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-8">
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#0A0A0A] rounded-t-xl border-x border-t border-white/5 flex items-center px-4 justify-between">
        <div className="flex items-center space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          <span className="ml-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">{language}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-all duration-200"
          title="Copy code"
        >
          {copied ? (
            <span className="text-[10px] font-bold text-brand-accent">COPIED</span>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>
      <pre className="p-6 pt-14 rounded-xl bg-[#050505] overflow-x-auto text-[13px] leading-relaxed border border-white/5">
        <code className="text-slate-300 font-mono block whitespace-pre">
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};