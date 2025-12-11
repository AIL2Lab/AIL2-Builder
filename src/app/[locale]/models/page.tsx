import AgentSortTab from "@/components/models/AgentSortTab";
import AgentStatusTab from "@/components/models/AgentStatusTab";
import AgentTableList from "@/components/models/AgentTableList";
import CreateModelBtn from "@/components/models/CreateModelBtn";
import MyAIModelBtn from "@/components/models/MyAIModelBtn";
import PageLayout from "@/components/PageLayout";

export default function ModelsPage({ params }: PageProps<"/[locale]/models">) {
  return (
    <PageLayout isShowFooter>
      <div className="w-full mx-auto lg:max-w-7xl my-4 sm:my-8 md:my-12 lg:my-16">
        {/* <div className="w-full max-w-[1400px] mx-auto rounded-[15px] p-6 bg-white dark:bg-card flex-1 flex flex-col"> */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-8">
            <div className="flex items-center gap-4">
              <AgentStatusTab />
            </div>
            <div className="flex items-center gap-4">
                <AgentSortTab />
            </div>
            <div>
                <MyAIModelBtn />
            </div>
            <div>
              <CreateModelBtn />
            </div>
          </div>
        </div>
        <div>
          <AgentTableList />
        </div>
      </div>
    </PageLayout>
  );
}
