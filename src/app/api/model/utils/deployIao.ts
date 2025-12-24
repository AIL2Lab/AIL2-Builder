import { serverWalletClient, publicClient } from "@/lib/server-wallet";
import { currentContracts } from "@/config/network.config";
import iaoFactoryAbi from "@/config/abis/iaoFactory.json";

export async function deployIaoOnChain(
  ownerAddress: string,
  tokenIn: string,
  rewardToken: string,
  aiL2NftHolder: string,
  startTime: bigint,
  depositPeriodHours: bigint,
  totalReward: bigint
): Promise<string> {
  console.log("Starting contract call to createIao...");
  
  try {
    const { request: contractRequest } = await publicClient.simulateContract({
        address: currentContracts.iaoFactory as `0x${string}`,
        abi: iaoFactoryAbi,
        functionName: 'createIao',
        args: [
            ownerAddress as `0x${string}`,
            tokenIn as `0x${string}`,
            rewardToken as `0x${string}`,
            aiL2NftHolder as `0x${string}`,
            startTime,
            depositPeriodHours,
            totalReward
        ],
        account: serverWalletClient.account,
    });

    const txHash = await serverWalletClient.writeContract(contractRequest);
    console.log("Contract call successful, txHash:", txHash);
    return txHash;
  } catch (error: any) {
    console.error("Contract call failed:", error);
    
    // If the error is EXTCALL, it likely means the contract logic reverted when calling the empty address,
    // OR the chain doesn't support the opcode.
    // However, since we cannot change the contract, we report the error.
    if (error.message?.includes("EXTCALL")) {
        console.error("⚠️  Potential Cause: The Factory contract might be attempting to call the empty 'iaoContractAddress'.");
        console.error("    Ensure a valid IAO implementation address is provided if the contract requires it.");
    }
    
    throw new Error(`Failed to create token on chain: ${error.message}`);
  }
}
