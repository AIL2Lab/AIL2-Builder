
export function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6 group">
      <div className="text-2xl font-black text-yellow-400 leading-none pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">{title}</h4>
        <p className="text-neutral-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
