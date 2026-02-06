import { useTranslations } from "next-intl"
import Image from "next/image"
export default function HomeFourthScreen() {
    const t = useTranslations("Home")
    return (
        <div className="container mx-auto lg:max-w-7xl my-5 sm:my-8 md:my-12 lg:my-16 px-5">
            <div className="justify-center flex flex-col items-center">
                <div className="ai-l2-btn w-fit text-base md:text-xl border border-theme/30 py-2.5 px-8 rounded-2xl">{t('fourthScreen.title')}</div>
                <div className="mt-5 font-bold text-base md:text-3xl text-center whitespace-nowrap">{t.rich('fourthScreen.superLayer', {br: () => <br />})}</div>
                <div className="mt-5 text-theme text-lg md:text-3xl font-normal">{t('fourthScreen.architecture')}</div>
            </div>
            <div className="w-full flex justify-center items-center relative">
                <Image width={1512} height={1206} src="/images/screen-4-1.png" alt="AIL2 6-Layer Decentralized AI Architecture - AI Superlayer Infrastructure"/>
                <Image className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width={1129} height={748} src="/images/screen-4-2.png" alt="AIL2 Multi-Chain AI Network - ETH BSC XLayer Base Mantle GIWA Integration"/>
            </div>
        </div>
    )
}