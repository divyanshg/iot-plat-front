import { policyColumns } from '@/columns';
import DataTable from '@/components/DataTable';
import EmptyState from '@/components/EmptyState';
import Loader from '@/components/Loader';
import { usePolicies } from '@/hooks/usePolicies';

function Policies() {
  const { data, isLoading, isRefetching, refetch } = usePolicies();

  if (isLoading) return <Loader />;

  if (!data || data?.code === 404 || data?.data === null) {
    return <div>Error fetching policies! Please refresh</div>;
  }
  const policies = data.data;
  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Policies</h1>
        <p className="text-lg font-light">
          Policies let you manage what actions your devices can perform. Select a policy to continue.
        </p>
      </div>
      <div className="flex-1 py-2">
        {policies?.length == 0 ? (
          <EmptyState link="new" text="Create a policy" />
        ) : (
          <DataTable
            data={policies}
            columns={policyColumns}
            newButtonLabel="Create a policy"
            newButtonLink="new"
            showNewButton
            showSearch
            searchColumn="name"
            searchPlaceholder="Search policies..."
            showRefreshButton
            onRefresh={refetch}
            isRefetching={isRefetching}
          />
        )}
      </div>
    </div>
  );
}

export default Policies;
