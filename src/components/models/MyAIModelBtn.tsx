'use client'
import { useConnection } from "wagmi";
import { Button } from "../ui/button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function MyAIModelBtn() {
    const { open } = useAppKit()
    const { address, isConnected, status } = useAppKitAccount()
    const { authenticate } = useAuth()
    useEffect(() => {
        if(address) {
            authenticate();
        }
    },[address, authenticate])
    const openModel = () => {
        if(address) {
            open({ view: 'Account' });
        } else {
            open({ view: 'Connect' });
        }
        
    }
    return (
        <>
        {
            true && 
            <Button onClick={openModel}>
                我的AI模型{address}
            </Button>
        }
        </>
    )
}