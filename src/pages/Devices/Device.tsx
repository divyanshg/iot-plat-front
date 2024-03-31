import { useParams } from 'react-router-dom';

import Loader from '@/components/Loader';
import PageHeader from '@/components/PageHeader';
import { useDevice } from '@/hooks/useDevices';

import LiveData from '../../components/LiveData';
import { SocketProvider } from '../../context/Dashboard';

function Device() {
  const { id } = useParams();
  const { data, isLoading } = useDevice(id!);

  if (isLoading) return <Loader />;

  if (!data || data?.code === 404 || data?.data === null) {
    return <div>Device not found</div>;
  }

  const device = data.data;
  return (
    <SocketProvider>
      <div className="min-h-full">
        <PageHeader
          pageTitle={`Devices`}
          title={device.name}
          desc={device.description}
        />
        <div className="my-4">
          <LiveData />
        </div>
      </div>
    </SocketProvider>
  );
}

export default Device;
