"use client";

import { getModelById } from "@/actions/models";
import { Model } from "@/generated/client";
import { ApiResponse } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

type Props = {
    id: string
    locale: string
}

export default function ModelDetail({id, locale}: Props) {
    const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<ApiResponse<Model>>({
    queryKey: ["model", id],
    queryFn: () => getModelById(id),
  });
  const detail = (response?.data ?? {}) as Model
  return (
    <section className="container mx-auto lg:max-w-5xl my-4 sm:my-8 md:my-12 lg:my-16 px-5">
      <div>{detail.id}</div>
      <div>{detail.name}</div>
      <div>{detail.symbol}</div>
      <div>{detail.description}</div>
    </section>
  );
}
