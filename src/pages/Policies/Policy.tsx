import { useParams } from 'react-router-dom';

import { deviceColumns } from '@/columns';
import DataTable from '@/components/DataTable';
import Loader from '@/components/Loader';
import PageHeader from '@/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePolicy } from '@/hooks/usePolicies';

function Policy() {
  const { id } = useParams();
  const { data, isLoading } = usePolicy(id!);

  if (isLoading) return <Loader />;

  if (!data || data?.code === 404 || data?.data === null) {
    return <div>Policy not found</div>;
  }

  const policy = data.data;
  return (
    <div className="min-h-full">
      <PageHeader
        pageTitle={`Policies`}
        title={policy.name}
        desc={policy.description}
      />
      <div className="my-4">
        <Tabs defaultValue="config" className="flex-1">
          <TabsList>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>
          <TabsContent value="devices" className="flex flex-1">
            <DataTable
              data={policy.devices}
              columns={deviceColumns}
              searchPlaceholder="Search devices..."
              searchColumn="name"
            />
          </TabsContent>
          <TabsContent value="config">
            <div className="flex flex-col space-y-4">
              <div>
                <h2>Allow connect</h2>
                <span className="mt-1 text-sm">
                  {policy.allowConnect ? (
                    <Badge className="bg-green-100">
                      <span className="font-semibold text-green-600">
                        Allowed
                      </span>
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100">
                      <span className="font-semibold text-red-600">
                        Not Allowed
                      </span>
                    </Badge>
                  )}
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <h2>Publishable topics ({policy.publishTopics.length})</h2>
                <div className="flex flex-col border border-gray-100 divide-y divide-gray-100 rounded">
                  {policy.publishTopics.length === 0 && (
                    <div className="p-2 border-gray-100">
                      <span className="text-gray-500">No topics</span>
                    </div>
                  )}
                  {policy.publishTopics.map((topic, index) => (
                    <div key={index} className="p-2 border-gray-100">
                      <span className="text-blue-500">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <h2>Subscribable topics ({policy.subscribeTopics.length})</h2>
                <div className="flex flex-col border border-gray-100 divide-y divide-gray-100 rounded">
                  {policy.subscribeTopics.length === 0 && (
                    <div className="p-2 border-gray-100">
                      <span className="text-gray-500">No topics</span>
                    </div>
                  )}
                  {policy.subscribeTopics.map((topic, index) => (
                    <div key={index} className="p-2 border-gray-100">
                      <span className="text-blue-500">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Policy;
