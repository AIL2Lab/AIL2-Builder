import { useTranslations } from "next-intl"
import Shower from "./Shower"

export default function ThirdScreen() {
    const t = useTranslations("Home")
    
    return (
        <section className="container mx-auto lg:max-w-5xl my-4 sm:my-8 md:my-12 lg:my-16 px-5">
            <div className="lg:w-3/5 font-bold text-base md:text-3xl mb-10">
                {t('thirdScreen.text')}
            </div>
            <Shower />
        </section>
    )
}