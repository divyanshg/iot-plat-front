import { Link, useParams } from 'react-router-dom';

import Loader from '@/components/Loader';
import PageHeader from '@/components/PageHeader';
import { SubGroup, useGroup, useSubGroups } from '@/hooks/useGroups';

import { Button } from '../../components/ui/button';

function SubGrpCard({
  name,
  desc,
  id,
}: {
  name: string;
  desc: string;
  id: string;
}) {
  return (
    <Link
      to={`subgroups/${id}`}
      className="flex flex-col p-6 space-y-2 border border-gray-100 rounded-lg shadow"
    >
      <h1 className="text-lg font-semibold">{name}</h1>
      <p>{desc}</p>
    </Link>
  );
}

function Group() {
  const { group_id: id } = useParams();
  const { data, isLoading, isError } = useGroup(id!);
  const { data: subGrpData, isLoading: isLoadingSub } = useSubGroups(id!);
  if (isLoading || isLoadingSub) return <Loader />;

  if (
    isError ||
    !data ||
    data.code == 404 ||
    !subGrpData ||
    subGrpData.code == 404
  )
    return "There was an error while fetching the group. Please try again";

  const group = data?.data;
  const subGroups = subGrpData.data;
  return (
    <div className="min-h-full">
      <div className="flex flex-row items-center justify-between">
        <PageHeader
          title={group?.name}
          desc={group.description}
          pageTitle={`Groups`}
        />
        <div>
          <Link to="subgroups/new">
            <Button>
              <span>Create Subgroup</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-4 gap-x-2 gap-y-2">
        {subGroups.map((subGrp: SubGroup) => (
          <SubGrpCard
            name={subGrp.name}
            id={subGrp.id}
            desc={subGrp.description!}
          />
        ))}
        {subGroups.length == 0 && (
          <div className="col-span-4 text-center text-gray-500">
            No subgroups created yet
          </div>
        )}
      </div>
    </div>
  );
}

export default Group;
