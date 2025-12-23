export const Badge = ({ children, color = 'blue', className="" }: { children?: React.ReactNode, color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple', className?: string }) => {
    const styles = {
        blue: "bg-blue-900/30 text-blue-400 border-blue-800",
        green: "bg-green-900/30 text-green-400 border-green-800",
        yellow: "bg-yellow-900/30 text-brand-gold border-brand-gold/30",
        red: "bg-red-900/30 text-red-400 border-red-800",
        gray: "bg-gray-800 text-gray-300 border-gray-700",
        purple: "bg-purple-900/30 text-purple-400 border-purple-800"
    };
    return (
        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${styles[color]} ${className}`}>
            {children}
        </span>
    );
};
