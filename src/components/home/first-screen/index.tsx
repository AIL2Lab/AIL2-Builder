
import { useTranslations } from 'next-intl';
import PlanetCarousel from './PlanetCarousel';

export default function HomeFirstScreen() {
    const t = useTranslations('Home');
    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-center items-center mt-30 sm:mt-60">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">{t("firstScreen.text")}</h1>
            </div>
            <PlanetCarousel />
        </div>
    )
}