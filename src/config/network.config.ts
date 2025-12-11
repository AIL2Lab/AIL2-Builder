import { type Chain } from "viem";


// dbc chain config
export const dbcMainnet = {
  id: Number(process.env.NEXT_PUBLIC_DBC_CHAIN_ID),
  name: process.env.NEXT_PUBLIC_DBC_CHAIN_NAME as string,
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_DBC_CHAIN_SYMBOL as string,
    symbol: process.env.NEXT_PUBLIC_DBC_CHAIN_SYMBOL as string,
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_DBC_CHAIN_RPC_URL as string] },
    public: { http: [process.env.NEXT_PUBLIC_DBC_CHAIN_RPC_URL as string] },
  },
  blockExplorers: {
    default: { name: 'DBCScan', url: process.env.NEXT_PUBLIC_DBC_CHAIN_BLOCK_EXPLORER_URL as string},
  },
  testnet: process.env.NODE_ENV === 'production'  ? false : true,
} as const satisfies Chain;


export const getTransactionUrl = (hash: string) => `${process.env.NEXT_PUBLIC_DBC_CHAIN_BLOCK_EXPLORER_URL }/tx/${hash}`;