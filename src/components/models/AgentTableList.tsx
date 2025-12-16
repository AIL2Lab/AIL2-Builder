'use client'
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { useAgentList } from "@/hooks/useAgentQueries";
import { agentFilterAtom } from "@/store/agent";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/types/api";
import { getAgents } from "@/actions/agents";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { fetchAgents, GetAgentsResult } from "@/services/agents.service";
const columns = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'salary', label: 'Salary', sortable: true },
  ];

const TableSkeletonRow = ({ columns }) => (
  <TableRow>
    {columns.map((_, index) => (
      <TableCell key={index}>
        <Skeleton className="h-4 w-full" />
      </TableCell>
    ))}
  </TableRow>
);

export default function AgentTableList() {
  const router = useRouter()
  const locale = useLocale()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse<GetAgentsResult>>({
    queryKey: ['agents', currentPage, pageSize],
    queryFn: () => fetchAgents({page:currentPage,pageSize,query: ''}),
    // keepPreviousData: true, 
  })
  const agents = apiResponse?.data?.list ?? []
  const goModelDetail = (id: string) => {
    router.push(`/${locale}/models/detail/${id}`)
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Agent信息</TableHead>
          <TableHead>代币符号</TableHead>
          <TableHead>类型</TableHead>
          <TableHead className="text-right">持有人数</TableHead>
          <TableHead className="text-right">市值</TableHead>
          <TableHead className="text-right">24小时涨跌</TableHead>
          <TableHead className="text-right">持有人数</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          // Loading 状态 - 显示骨架屏
          Array.from({ length: pageSize }).map((_, index) => (
            <TableSkeletonRow key={index} columns={columns} />
          ))
        ) : agents.length === 0 ? (
          // 无数据状态
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-8">
              <div className="text-muted-foreground">
                No data available
              </div>
            </TableCell>
          </TableRow>
        ) : (
          agents.map((agent, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium" onClick={() => goModelDetail(agent.id)}>{agent.name}</TableCell>
              <TableCell>{agent.symbol}</TableCell>
              <TableCell>{agent.type}</TableCell>
              <TableCell className="text-right">{agent.holdersCount?.toLocaleString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
