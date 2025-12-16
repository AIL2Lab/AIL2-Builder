
import ModelDetail from "@/components/models/detail/ModelDetail";
import PageLayout from "@/components/PageLayout";

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
