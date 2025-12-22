'use client'; 

import { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 font-semibold text-white"
    >
      {isCopied ? '已复制!' : '复制'}
    </button>
  );
}
