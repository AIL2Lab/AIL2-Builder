import { type Chain } from "viem";

// Define a type that combines Chain info and Contract addresses
type NetworkConfig = {
    chain: Chain;
    contracts: {
        iaoFactory: string;
    };
};

// DBC Mainnet Configuration
const dbcMainnetConfig: NetworkConfig = {
    chain: {
        id: Number(process.env.NEXT_PUBLIC_DBC_CHAIN_ID),
        name: process.env.NEXT_PUBLIC_DBC_CHAIN_NAME as string,
        nativeCurrency: {
            name: process.env.NEXT_PUBLIC_DBC_CHAIN_SYMBOL as string,
            symbol: process.env.NEXT_PUBLIC_DBC_CHAIN_SYMBOL as string,
            decimals: 18,
        },
        rpcUrls: {
            default: { http: [process.env.NEXT_PUBLIC_DBC_CHAIN_RPC_URL || "https://rpc.dbcwallet.io"] },
            public: { http: [process.env.NEXT_PUBLIC_DBC_CHAIN_RPC_URL || "https://rpc.dbcwallet.io"] },
        },
        blockExplorers: {
            default: { name: 'DBCScan', url: process.env.NEXT_PUBLIC_DBC_CHAIN_BLOCK_EXPLORER_URL as string },
        },
        testnet: process.env.NODE_ENV === 'production' ? false : true,
    } as const satisfies Chain,
    contracts: {
        iaoFactory: process.env.NEXT_PUBLIC_IAO_FACTORY_ADDRESS as string,
    },
};

// BNB Testnet Configuration
const bnbTestnetConfig: NetworkConfig = {
    chain: {
        id: 97,
        name: 'BNB Smart Chain Testnet',
        nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
        },
        rpcUrls: {
            default: { http: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'] },
            public: { http: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545'] },
        },
        blockExplorers: {
            default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
        },
        testnet: true,
    } as const satisfies Chain,
    contracts: {
        iaoFactory: '0x09fC549Afd848E77294c81EeC2ffD85528ad267B',
    },
};

// --- Exported Configurations ---

// 1. Available Networks List (for Wagmi/AppKit)
export const networks = [
    // dbcMainnetConfig.chain, 
    bnbTestnetConfig.chain] as const;

// 2. Current Selected Network Configuration (Hardcoded for now as requested)
// Change this to bnbTestnetConfig to switch networks
const currentNetworkConfig = bnbTestnetConfig; 

// 3. Exported Helpers & Constants based on Current Network
export const currentChain: Chain = currentNetworkConfig.chain;
export const currentContracts = currentNetworkConfig.contracts;

export const getTransactionUrl = (hash: string) => {
    // Dynamically determine the explorer URL based on currentChain
    const explorerUrl = currentChain.blockExplorers?.default.url;
    return `${explorerUrl}/tx/${hash}`;
};
