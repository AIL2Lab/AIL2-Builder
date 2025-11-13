import { useTranslations } from "next-intl"
import Shower from "./Shower"

export default function ThirdScreen() {
    const t = useTranslations("Home")
    
    return (
        <section className="container mx-auto lg:max-w-5xl my-6 sm:my-12 md:my-24 lg:my-32 px-5">
            <div className="lg:w-3/5 font-bold text-base md:text-3xl mb-10">
                {t('thirdScreen.text')}
            </div>
            <Shower />
        </section>
    )
}