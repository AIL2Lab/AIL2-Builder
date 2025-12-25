import React from 'react';
import Image from 'next/image';

interface Creator {
  id: string;
  address: string;
  nickname?: string | null;
  avatar?: string | null;
}

interface ModelData {
  id: string;
  name: string;
  symbol: string;
  description: string;
  avatar?: string | null;
  iaoContractAddress?: string | null;
  creator: Creator;
}

interface TokenInfoProps {
  data: ModelData;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ data }) => {
  const { name, symbol, iaoContractAddress, description, avatar, creator } = data;

  // Format address for display (e.g., 0x1234...5678)
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 mb-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-gray-200">
             {avatar ? (
                <Image 
                  src={avatar} 
                  alt={name} 
                  fill
                  className="object-cover"
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                  {name.charAt(0)}
                </div>
             )}
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl font-bold text-white">{name}</h1>
              <span className="text-xl text-gray-400">${symbol}</span>
            </div>
            {iaoContractAddress && (
              <div className="flex items-center gap-2 mt-1 bg-white/10 px-3 py-1 rounded-full w-fit">
                <span className="text-sm text-gray-300">Contract:</span>
                <span className="text-sm text-white font-mono">{formatAddress(iaoContractAddress)}</span>
                <button 
                  onClick={() => copyToClipboard(iaoContractAddress)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Creator Badge */}
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl">
          <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-600">
            {creator.avatar ? (
                 <Image 
                   src={creator.avatar} 
                   alt={creator.nickname || 'Creator'} 
                   fill
                   className="object-cover"
                 />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            )}
          </div>
          <div>
            <div className="text-xs text-gray-400">Creator</div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                    {creator.nickname || formatAddress(creator.address)}
                </span>
                <button 
                  onClick={() => copyToClipboard(creator.address)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-2">描述</h3>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TokenInfo;
