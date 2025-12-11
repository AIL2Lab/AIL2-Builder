
import { getAgentById } from "@/actions/agents";
import ModelDetail from "@/components/models/detail/ModelDetail";
import PageLayout from "@/components/PageLayout";
import { Agent } from "@/generated/client";
import { ApiResponse } from "@/types/response.type";
import { useQuery } from "@tanstack/react-query";

export default async function ModelDetailPage({
  params,
}: PageProps<"/[locale]/models/detail/[id]">) {
  const { locale, id } = await params;
  

  return (
    <PageLayout isShowFooter>
      <ModelDetail id={id} locale={locale} />
    </PageLayout>
  );
}
