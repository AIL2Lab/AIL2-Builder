import { useLocale, useTranslations } from "next-intl";
import { SideNavItem } from "./SideBarItem";

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[]
}
type Props = {
    items: NavItem[]
}
export default function SideBar({ items }:Props) {
    const t = useTranslations("Navbar")
    const locale = useLocale()
    return (
        <div className="side-bar z-30 px-6 pt-2 fixed flex max-w-full inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto backdrop-blur-xl backdrop-saturate-150 bg-background/70">
            <ul>
                {
                    items.map((item,idx) => (
                        <SideNavItem key={idx} item={item} />
                    ))
                }
            </ul>
        </div>
    )
}