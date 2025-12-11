"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { statusFilterAtom } from "@/store/agent";
import { useAtom } from "jotai";
import { useState } from "react";

export default function AgentStatsTab() {
  const [filterStatus, setFilterStatus] = useAtom(statusFilterAtom)
  return (
    <>
      <span className="text-muted-color text-xs whitespace-nowrap">筛选</span>
      <Tabs
        value={filterStatus}
        className="w-auto"
        onValueChange={(value) => {
          setFilterStatus(value);
        }}
      >
        <TabsList className="bg-transparent border border-[#E5E5E5] dark:border-white/30 p-1 flex-wrap lg:flex-nowrap">
          <TabsTrigger
            value=""
            className="data-[state=active]:bg-foreground data-[state=active]:text-background px-2 lg:px-4 py-1 text-xs lg:text-sm whitespace-nowrap"
          >
            全部
          </TabsTrigger>
          <TabsTrigger
            value="IAO_ONGOING"
            className="data-[state=active]:bg-foreground data-[state=active]:text-background px-2 lg:px-4 py-1 text-xs lg:text-sm whitespace-nowrap"
          >
            IAO进行中
          </TabsTrigger>
          <TabsTrigger
            value="TRADABLE"
            className="data-[state=active]:bg-foreground data-[state=active]:text-background px-2 lg:px-4 py-1 text-xs lg:text-sm whitespace-nowrap"
          >
            可交易
          </TabsTrigger>
          <TabsTrigger
            value="IAO_COMING_SOON"
            className="data-[state=active]:bg-foreground data-[state=active]:text-background px-2 lg:px-4 py-1 text-xs lg:text-sm whitespace-nowrap"
          >
            IAO即将开始
          </TabsTrigger>
          <TabsTrigger
            value="FAILED"
            className="data-[state=active]:bg-foreground data-[state=active]:text-background px-2 lg:px-4 py-1 text-xs lg:text-sm whitespace-nowrap"
          >
            IAO失败
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
