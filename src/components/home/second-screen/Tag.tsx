

import clsx from "clsx"
import { ReactNode } from "react"
type Props = {
    children: ReactNode
    className?: string
    text: string
    subtext: string
    isRightBorder: boolean
}


export default function Tag({children, className, text, subtext, isRightBorder}: Props) {
    return (
        <div className={clsx("tag-item flex items-center px-2.5 py-2.5  border-theme", className, `${isRightBorder ? 'border-r-2' : 'border-l-2' }`)}>
            <div className="border border-theme/30 bg-theme/20 w-10 h-10 flex justify-center items-center rounded-full mr-5">
                {children}
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-medium text-theme">{text}</span>
                <span className="text-base">{subtext}</span>
            </div>
        </div>
    )
}