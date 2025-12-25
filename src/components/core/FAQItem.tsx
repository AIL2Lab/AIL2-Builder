'use client'
import { Plus } from "lucide-react";
import { ReactNode, useState } from "react";

export const FAQItem = ({ question, answer }: { question: string, answer: string| ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 last:border-0 w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-gold' : 'text-gray-400 group-hover:text-white'}`}>{question}</span>
        <Plus className={`transition-transform duration-300 ${isOpen ? 'rotate-45 text-brand-gold' : 'text-gray-500'}`} size={20} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};