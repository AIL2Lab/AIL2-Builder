import { CreateAgentForm } from "@/components/models/create/AgentForm";
import PageLayout from "@/components/PageLayout";

export default function ModelsCreatePage({
  params,
}: PageProps<"/[locale]/models/create">) {
  return (
    <PageLayout isShowFooter>
      <section className="container mx-auto lg:max-w-5xl my-4 sm:my-8 md:my-12 lg:my-16 px-5">
        <CreateAgentForm />
      </section>
    </PageLayout>
  );
}
