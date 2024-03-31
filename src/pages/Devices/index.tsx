import { deviceColumns } from '@/columns';
import DataTable from '@/components/DataTable';
import EmptyState from '@/components/EmptyState';
import Loader from '@/components/Loader';
import { useDevices } from '@/hooks/useDevices';

function Devices() {
  const { data, isLoading, refetch, isRefetching } = useDevices();

  if (isLoading) return <Loader />;

  if (!data || data?.code === 404 || data?.data === null) {
    return <div>Error loading devices! Please refresh</div>;
  }

  const devices = data.data;

  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Devices</h1>
        <p className="text-lg font-light">
          All devices are listed here. Select a device to continue.
        </p>
      </div>
      <div className="flex-1 py-2">
        {devices?.length === 0 ? (
          <EmptyState link="new" text="Create a device" />
        ) : (
          <DataTable
            data={devices}
            columns={deviceColumns}
            showNewButton
            newButtonLabel="Create a device"
            newButtonLink="new"
            searchColumn="name"
            searchPlaceholder="Search devices..."
            showRefreshButton
            onRefresh={refetch}
            isRefetching={isRefetching}
          />
        )}
      </div>
    </div>
  );
}

export default Devices;
