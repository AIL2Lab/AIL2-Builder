import { useTranslations } from "next-intl"
import Selector from "./Selector"



export default function ThirdScreen() {
    const t = useTranslations("Home")
    return (
        <section className="container mx-auto lg:max-w-7xl md:my-24 lg:my-32 ">
            <div>
                {t('thirdScreen.text')}
            </div>
            <div>
                <Selector />
            </div>
        </section>
    )
}