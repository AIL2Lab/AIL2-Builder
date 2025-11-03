
type Props = {
    text: string
}

export default function Tag({text}: Props) {
    return (
        <span className="bg-white/10 py-1 px-2 text-[10px] rounded-sm mb-2">{text}</span>
    )
}