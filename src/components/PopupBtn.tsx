"use client"; // 必须标记为客户端组件

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface PopupBtnProps {
  label: string | React.ReactNode;
  title: string;
  content: React.ReactNode;
}

export default function PopupBtn({ label, title, content }: PopupBtnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 防止服务端渲染不匹配问题
  useEffect(() => {
    setMounted(true);
  }, []);

  // 锁定/解锁背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <span
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:opacity-80 transition-opacity hover:underline whitespace-nowrap"
      >
        {label}
      </span>
      {mounted && isOpen && createPortal(
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-[#121212] border border-white/10 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="text-xl font-bold text-white mb-4 pr-8">{title}</h3>
            <div className="text-gray-300 leading-relaxed max-h-[60vh] overflow-y-auto">
              {content}
            </div>
            {/* <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors text-white"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}