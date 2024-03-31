import { ExternalLink, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateDevice } from '@/hooks/useDevices';
import { useGroups, useSubGroups } from '@/hooks/useGroups';
import { usePolicies } from '@/hooks/usePolicies';

function NewDevice() {
  const [policy_id, setPolicyId] = useState<string | null>();
  const [group_id, setGroupId] = useState<string>("");
  const [sub_group_id, setSubGroupId] = useState<string | null>();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const {
    data: policies_data,
    isLoading: loadingPolicies,
    refetch: refetchPolicies,
    isRefetching: isPoliciesRefetching,
  } = usePolicies();
  const {
    data: groups_data,
    isLoading: loadingGroups,
    refetch: refetchGroups,
  } = useGroups();
  const {
    data: sub_data,
    isLoading: loadingSubGroups,
    refetch: refetchSubgroups,
    isRefetching: isSubGroupsRefetching,
  } = useSubGroups(group_id);
  const { mutate: createDevice, isPending } = useCreateDevice();

  useEffect(() => {
    if (
      policies_data &&
      policies_data.code == 200 &&
      policies_data.data.length > 0
    ) {
      setPolicyId(policies_data.data[0].id);
    }
  }, [policies_data]);

  useEffect(() => {
    if (group_id) refetchSubgroups();
  }, [group_id, refetchSubgroups]);

  function handleCreate() {
    if (!policy_id) return toast.error("Please select a policy");
    if (form.name.length < 1) return toast.error("Please enter a device name");
    createDevice({
      ...form,
      subGroupId: sub_group_id,
      policyId: policy_id,
    });
  }

  const policies = policies_data?.data || [];
  const groups = groups_data?.data || [];
  const subGroups = sub_data?.data || [];
  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Create a device</h1>
        <p className="text-lg font-light">
          Devices let you connect to the internet.
        </p>
      </div>
      <div className="flex-1 py-4 mt-4">
        <div className="flex flex-col w-1/3 space-y-3">
          <div className="flex flex-col w-full space-y-2">
            <div>
              <h4 className="font-semibold">Enter device name</h4>
            </div>
            <div>
              <Input
                name="device-name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
              />
            </div>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <div>
              <h4 className="font-semibold">Description (optional)</h4>
            </div>
            <div>
              <Input
                name="description"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                value={form.description}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-row items-center justify-between">
              <h4 className="font-semibold">Select Group (optional)</h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={refetchGroups as never}
                  isLoading={isSubGroupsRefetching}
                >
                  <RotateCcw size={18} />
                </Button>
              </div>
            </div>
            <div>
              <select
                name="groups"
                id=""
                disabled={loadingGroups}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full px-2 py-3 border border-gray-200 rounded"
              >
                <option value="">Select group</option>
                {groups.length == 0 ? (
                  <option value="">No groups found</option>
                ) : (
                  groups.map((group) => (
                    <option value={group.id}>{group.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {group_id && (
            <div className="flex flex-col space-y-3">
              <div className="flex flex-row items-center justify-between">
                <h4 className="font-semibold">Select subgroup</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={refetchSubgroups as never}
                    isLoading={isSubGroupsRefetching}
                  >
                    <RotateCcw size={18} />
                  </Button>
                </div>
              </div>
              <div>
                <select
                  name="subGroups"
                  id=""
                  disabled={loadingSubGroups}
                  onChange={(e) => setSubGroupId(e.target.value)}
                  className="w-full px-2 py-3 border border-gray-200 rounded"
                >
                  <option value="">Select subgroup</option>
                  {subGroups.length == 0 ? (
                    <option value="">No subGroups found</option>
                  ) : (
                    subGroups.map((subGroup) => (
                      <option value={subGroup.id}>{subGroup.name}</option>
                    ))
                  )}
                </select>
              </div>
            </div>
          )}
          <div className="flex flex-col space-y-3">
            <div className="flex flex-row items-center justify-between">
              <h4 className="font-semibold">Attach policy</h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={refetchPolicies as never}
                  isLoading={isPoliciesRefetching}
                >
                  <RotateCcw size={18} />
                </Button>
                <Link to="../../policies/new" target="_blank">
                  <Button>
                    <span>Create policy</span>
                    <span className="ml-1">
                      <ExternalLink size={18} />
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <select
                name="policy"
                id=""
                disabled={loadingPolicies}
                onChange={(e) => setPolicyId(e.target.value)}
                className="w-full px-2 py-3 border border-gray-200 rounded"
              >
                {policies.length == 0 ? (
                  <option value="">No policies found</option>
                ) : (
                  policies.map((policy) => (
                    <option value={policy.id}>{policy.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>
          <div>
            <Button
              isLoading={isPending}
              onClick={handleCreate}
              className="w-[140px] bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            >
              <span>Create</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewDevice;
