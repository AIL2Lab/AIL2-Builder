import { createWalletClient, http, createPublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { currentChain } from '@/config/network.config';

const privateKey = process.env.SERVER_WALLET_PRIVATE_KEY as `0x${string}`;

if (!privateKey) {
  console.warn("⚠️ SERVER_WALLET_PRIVATE_KEY environment variable is not set. Server-side transactions will fail.");
}

let account;
try {
    if (privateKey) {
        // Simple check to avoid crashing on obvious bad keys (like placeholders)
        if (!privateKey.startsWith('0x') && !/^[0-9a-fA-F]+$/.test(privateKey)) {
             throw new Error("Private key must be a hex string");
        }
        account = privateKeyToAccount(privateKey);
    }
} catch (error) {
    console.error("❌ Failed to initialize server wallet account. Invalid Private Key format.");
    // Do not crash the process, just leave account undefined. 
    // Transactions will fail later if attempted, which is better than crash on startup.
}

export const serverWalletClient = createWalletClient({
  account,
  chain: currentChain,
  transport: http(),
});

export const publicClient = createPublicClient({
    chain: currentChain,
    transport: http(undefined, {
        timeout: 60000, // 60 seconds timeout
        retryCount: 3,
        retryDelay: 2000,
    })
});
