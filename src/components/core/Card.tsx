export const Card = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-brand-panel border border-[#171717] hover:border-theme rounded-2xl p-6 hover:border-brand-gold/50 transition-all duration-300 ${className}`}>
    {children}
  </div>
);