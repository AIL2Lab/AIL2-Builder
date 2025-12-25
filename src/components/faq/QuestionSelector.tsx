
import { FAQItem } from "../core/FAQItem";

type Question = {
  text: string;
  answerText: string;
};

export default function QuestionSelector({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {questions.map((q, idx) => {
          return (
            <div
              key={idx}
              className={`hover:bg-black hover:border-theme hover:text-theme bg-white/5 border-transparent text-white group w-full flex items-center justify-between 
                    px-5 rounded-xl text-lg font-medium transition-all duration-200 border cursor-pointer`}
            >
              <FAQItem question={q.text} answer={q.answerText} />
            </div>
          );
        })}
    </div>
  );
}
