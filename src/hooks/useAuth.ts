import { useAppKitAccount } from "@reown/appkit/react";



export function useAuth() {
    const { address, isConnected, status } = useAppKitAccount();
    
}