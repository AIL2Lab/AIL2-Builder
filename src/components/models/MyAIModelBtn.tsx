'use client'
import { useConnection } from "wagmi";
import { Button } from "../ui/button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner"
export default function MyAIModelBtn() {
    const { open } = useAppKit()
    const { address, isConnected, status } = useAppKitAccount()
    const openModel = () => {
        open({ view: 'Connect' });
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