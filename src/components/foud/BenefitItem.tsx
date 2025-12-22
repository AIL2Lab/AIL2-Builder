import { CheckCircle } from "lucide-react";

export function BenefitItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1">
        <CheckCircle className="text-yellow-400" size={24} />
      </div>
      <div>
        <strong className="block text-lg font-bold text-white mb-1">{title}</strong>
        <span className="text-neutral-400 leading-relaxed">{desc}</span>
      </div>
    </div>
  );
}