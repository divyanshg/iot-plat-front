import { certColumns } from '@/columns';
import DataTable from '@/components/DataTable';
import EmptyState from '@/components/EmptyState';
import Loader from '@/components/Loader';
import { useCertificates } from '@/hooks/useCertificates';

function Certificates() {
  const { data, isLoading, refetch, isRefetching } = useCertificates();

  if (isLoading) return <Loader />;

  if (!data || data?.code === 404 || data?.data === null) {
    return <div>Error fetching certificates! Please refresh</div>;
  }

  const certificates = data.data;
  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Certificates</h1>
        <p className="text-lg font-light">
          Certificates let your devices connect securely to our platform. Select a certificate to
          continue.
        </p>
      </div>
      <div className="flex-1 py-2">
        {certificates?.length == 0 ? (
          <EmptyState link="new" text="Create a certificate" />
        ) : (
          <DataTable
            data={certificates}
            columns={certColumns}
            showSearch={false}
            showNewButton
            newButtonLabel="Create a certificate"
            newButtonLink="new"
            showRefreshButton
            onRefresh={refetch}
            isRefetching={isRefetching}
          />
        )}
      </div>
    </div>
  );
}

export default Certificates;
