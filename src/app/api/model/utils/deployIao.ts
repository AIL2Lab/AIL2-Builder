import { serverWalletClient, publicClient } from "@/lib/server-wallet";
import { currentContracts } from "@/config/network.config";
import iaoFactoryAbi from "@/config/abis/iaoFactory.json";
import { decodeEventLog } from 'viem';

export async function deployIaoOnChain(
  ownerAddress: string,
  tokenIn: string,
  rewardToken: string,
  aiL2NftHolder: string,
  startTime: bigint,
  depositPeriodHours: bigint,
  totalReward: bigint
): Promise<{ 
  txHash: string;
  contractAddress: string;
  owner: string;
  stakeToken: string;
  rewardToken: string;
  nftHolder: string;
  startTime: bigint;
  endTime: bigint;
  depositPeriod: bigint;
  totalReward: bigint;
}> {
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

    // Wait for transaction receipt to get the new contract address
    console.log("Waiting for transaction receipt...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

    let contractAddress = "";
    
    // Parse logs to find IaoCreated event
    for (const log of receipt.logs) {
      try {
        const decodedLog = decodeEventLog({
          abi: iaoFactoryAbi,
          data: log.data,
          topics: log.topics,
        });

        if (decodedLog.eventName === 'IaoCreated') {
          contractAddress = (decodedLog.args as any).proxyAddress;
          console.log("IAO Contract created at:", contractAddress);
          break;
        }
      } catch (e) {
        // Ignore logs that cannot be decoded (not part of our ABI)
      }
    }

    if (!contractAddress) {
        console.warn("⚠️ Could not find IaoCreated event in transaction logs.");
        throw new Error("Failed to extract contract address from transaction logs");
    }

    // Calculate endTime based on startTime and depositPeriod
    const endTime = startTime + (depositPeriodHours * 3600n); // Convert hours to seconds

    return { 
      txHash, 
      contractAddress,
      owner: ownerAddress,
      stakeToken: tokenIn,
      rewardToken: rewardToken,
      nftHolder: aiL2NftHolder,
      startTime: startTime,
      endTime: endTime,
      depositPeriod: depositPeriodHours,
      totalReward: totalReward
    };
  } catch (error: any) {
    console.error("Contract call failed:", error);
    
    if (error.message?.includes("EXTCALL")) {
        console.error("⚠️  Potential Cause: The Factory contract might be attempting to call the empty 'iaoContractAddress'.");
        console.error("    Ensure a valid IAO implementation address is provided if the contract requires it.");
    }
    
    throw new Error(`Failed to create token on chain: ${error.message}`);
  }
}
