"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
type Question = {
  id: number;
  text: string;
  answerTitle: string;
  answerText: string;
};

export default function QuestionSelector({
  questions,
}: {
  questions: Question[];
}) {
  const [current, setActive] = useState<Question>(questions[0]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      <div className="lg:col-span-5 flex flex-col gap-3">
        {questions.map((q) => {
          const isActive = current.id === q.id;
          return (
            <button
              key={q.id}
              onClick={() => setActive(q)}
              className={`
                    group w-full flex items-center justify-between 
                    px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200 border cursor-pointer
                    ${
                      isActive
                        ? "bg-black border-theme text-theme"
                        : "bg-white/5 border-transparent text-white/30 hover:bg-[#1a1a1a]"
                    }
                  `}
            >
              <span>{q.text}</span>
              {isActive ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
              )}
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-7 pt-2">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-6">
          {current.answerTitle}
        </h2>

        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
          <p>{current.answerText}</p>
        </div>
      </div>
    </div>
  );
}
