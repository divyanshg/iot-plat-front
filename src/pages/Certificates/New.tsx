import { ExternalLink, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useCreateCertificate } from '@/hooks/useCertificates';
import { usePolicies } from '@/hooks/usePolicies';

function NewCertificate() {
  const [certType, setCertType] = useState<"CLAIM" | "NORMAL">("CLAIM");
  const [policy_id, setPolicyId] = useState<string | null>();
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");

  const { mutate: createCertificate, isPending } = useCreateCertificate();
  const {
    data: policies_data,
    isLoading: loadingPolicies,
    refetch: refetchPolicies,
    isRefetching: isPoliciesRefetching,
  } = usePolicies();

  useEffect(() => {
    if (
      policies_data &&
      policies_data.code == 200 &&
      policies_data.data.length > 0
    ) {
      setPolicyId(policies_data.data[0].id);
    }
  }, [policies_data]);

  function handleCreate() {
    if (!policy_id) return toast.error("Please select a policy");
    createCertificate({ type: certType, policy_id, status });
  }

  const policies = policies_data?.data || [];

  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Create a certificate</h1>
        <p className="text-lg font-light">
          Certificates lets your devices communicate securely to the platform.
          Select a certificate to continue.
        </p>
      </div>
      <div className="flex-1 py-4 mt-4">
        <div className="flex flex-col w-1/3 space-y-3">
          <div>
            <h4 className="font-semibold">Certificate type</h4>
          </div>
          <div>
            <select
              name="cert-type"
              onChange={(e) => setCertType(e.target.value as never)}
              className="w-full px-2 py-3 border border-gray-200 rounded"
            >
              {/* <option value="NORMAL" selected>
                Normal certificate
              </option> */}
              <option selected value="CLAIM">
                Claim certificate
              </option>
            </select>
          </div>
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
          <div>
            <div>
              <h4 className="font-semibold">Initial status</h4>
            </div>
            <div>
              <div className="flex flex-row items-center space-x-2">
                <input
                  onChange={(e) => setStatus(e.target.value as never)}
                  type="radio"
                  name="status"
                  value="ACTIVE"
                />
                <label htmlFor="status">Active</label>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <input
                  onChange={(e) => setStatus(e.target.value as never)}
                  type="radio"
                  name="status"
                  id=""
                  value="INACTIVE"
                />
                <label htmlFor="status">Inactive</label>
              </div>
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

export default NewCertificate;
