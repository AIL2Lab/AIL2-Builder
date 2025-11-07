import { useTranslations } from "next-intl"
import Shower from "./Shower"

const list = [
    {
        title: 'Endless scalability',
        subtitle: 'Scalability without limits, enabling Al and Web3 applications to achieve unrestricted growth.',
        image: "https://picsum.photos/seed/design/800/600.jpg"
    },
    {
        title: 'GPU Driver',
        subtitle: "GPU miners deploy Al models,developers don't need to manage or maintain them.",
        image: "https://picsum.photos/seed/tech/800/600.jpg"
    },
    {
        title: 'Fluid Composability',
        subtitle: 'Developers can integrate effortlessly to build, link, and scale Al-powered Web3 applications with ease.',
        image: "https://picsum.photos/seed/ux/800/600.jpg"
    }
]

export default function ThirdScreen() {
    const t = useTranslations("Home")
    
    return (
        <section className="container mx-auto lg:max-w-5xl my-6 sm:my-12 md:my-24 lg:my-32 px-5">
            <div className="lg:w-3/5 font-bold text-base md:text-3xl mb-10">
                {t('thirdScreen.text')}
            </div>
            {/* <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                    {
                    list.map((item,idx) => (
                        <div key={idx}>
                            <div className="text-theme text-2xl">{item.title}</div>
                            <div className="text-white/50">{item.subtitle}</div>
                        </div>
                    ))
                }
                </div>
                <div className="col-span-2 md:col-span-1 px-10">
                    <div className="flex-1 bg-black rounded-xl"></div>
                </div>
            </div> */}
            <Shower />
        </section>
    )
}