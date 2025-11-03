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
        <div className="space-x-2 flex flex-wrap absolute w-full left-0 bottom-10 px-5">
          {tags.map((item, idx) => (
            <Tag text={item} key={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
