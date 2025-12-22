export function PortfolioCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group bg-transparent p-6 rounded-2xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer text-center hover:-translate-y-2">
      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 text-yellow-400 group-hover:scale-110 group-hover:bg-yellow-400/10 transition-all duration-300">
        {icon}
      </div>
      <h4 className="text-2xl font-extrabold mb-2 text-neutral-300 group-hover:text-white transition-colors">{title}</h4>
      <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">{desc}</p>
    </div>
  );
}