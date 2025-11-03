import Image from "next/image"
export default function HomeFourthScreen() {
    return (
        <div className="container mx-auto lg:max-w-7xl md:my-24 lg:my-32 ">
            <div className="justify-center flex flex-col items-center">
                <div className="ai-l2-btn w-fit text-xl border border-theme/30 py-2.5 px-5 rounded-2xl">The Largest AI L2</div>
                <div className="mt-5 font-bold text-3xl">The AI Superlayer Unifying</div>
                <div className="font-bold text-3xl">ETH, BSC, GIWA, XLayer, Base, Mantle</div>
                <div className="mt-5 text-theme text-3xl font-normal">AIL2 5 Layer Architecture</div>
            </div>
            <div className="w-full flex justify-center items-center relative">
                <Image width={1512} height={1206} src="/images/screen-4-1.png" alt=""/>
                <Image className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width={1129} height={748} src="/images/screen-4-2.png" alt=""/>
            </div>
        </div>
    )
}