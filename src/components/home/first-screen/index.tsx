
import { useTranslations } from 'next-intl';
import ChainCircle from './chain-circle'

export default function HomeFirstScreen() {
    const t = useTranslations('Home');
    return (
        <div className="h-screen flex flex-col">
            <div className="w-full flex justify-center items-center mt-80">
                <h1 className="text-7xl font-extrabold">{t("firstScreen.text")}</h1>
            </div>
            <div className="w-full flex flex-1 justify-center items-center mt-30 overflow-hidden">
                <ChainCircle />
            </div>

        </div>
    )
}