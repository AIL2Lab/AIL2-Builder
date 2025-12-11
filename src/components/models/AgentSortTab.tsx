"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentSortField, STATUS_SORT_OPTIONS_MAP } from "@/types/agent";
import { useState } from "react";
import { statusFilterAtom } from "@/store/agent";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
STATUS_SORT_OPTIONS_MAP;
export default function AgentSortTab() {
    const searchParams = useSearchParams()
    const urlSortBy = searchParams?.get('sortBy');
  const [filterStatus] = useAtom(statusFilterAtom);
  const currentSortOptions =
    STATUS_SORT_OPTIONS_MAP[filterStatus] || STATUS_SORT_OPTIONS_MAP[""];
  const [sortField, setSortField] = useState<AgentSortField>(() => {
    if (urlSortBy && Object.values(AgentSortField).includes(urlSortBy as AgentSortField)) {
      return urlSortBy as AgentSortField;
    }
    return currentSortOptions.default;
  });

  return (
    <>
      <span className="text-muted-color text-xs whitespace-nowrap">
        排序方式
      </span>
      <Tabs
        value={sortField}
        className="w-auto"
        onValueChange={(value) => {
          setSortField(value as AgentSortField);
        }}
      >
        <TabsList className="bg-transparent border border-[#E5E5E5] dark:border-white/30 p-1">
          {currentSortOptions.options.map((option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              className="data-[state=active]:bg-foreground data-[state=active]:text-background px-3 lg:px-4 py-1 text-xs lg:text-sm"
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
}
