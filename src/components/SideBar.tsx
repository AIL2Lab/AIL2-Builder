import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SideBar() {
    const t = useTranslations("Navbar")
    return (
        <div className="side-bar z-30 px-6 pt-2 fixed flex max-w-full inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            
            <ul>
                <li className="py-5">
                    <Link href="/">{t("research")}</Link>
                </li>
                <li className="py-5">
                    <Link href="/">{t("ecosystem")}</Link>
                </li>
                <li className="py-5">
                    <Link href="/">{t("learn")}</Link>
                </li>
                <li className="py-5">
                    <Link href="/">{t("blog")}</Link>
                </li>
            </ul>
        </div>
    )
}