
import Image from "next/image"
import { BlockchainCarousel } from "./BlockchainCarousel"

export default function ChainCircle() {
    return (
        <div className="mt-20">
            <BlockchainCarousel />
            <div className="w-full relative h-40 sm:h-60 md:h-80 lg:h-100 overflow-hidden">
                <div className="circle bg-background  w-[800px] h-[800px] sm:w-[1600px] sm:h-[1600px] lg:w-[3200px] lg:h-[3200px]"></div>
            </div>
        </div>
    )
}