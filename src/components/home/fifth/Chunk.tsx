import clsx from "clsx";
import { ReactNode } from "react";
import Tag from "./Tag";

type Props = {
  children: ReactNode;
  className?: string;
  title: string;
  tags?: string[];
};

export default function ChunkItem({ children, className, title, tags }: Props) {
  return (
    <div className={clsx(className, 'relative')}>
      <div className="text-theme font-bold text-lg">{title}</div>
      {children}
      {tags && tags.length > 0 && (
        <div className="space-x-2 lg:flex flex-wrap w-full hidden ">
          {tags.map((item, idx) => (
            <Tag text={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
