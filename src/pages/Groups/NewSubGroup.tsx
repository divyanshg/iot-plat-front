import { useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateSubGroup, useGroup } from "@/hooks/useGroups";

function NewSubGroup() {
  const { group_id } = useParams();
  const { data: group_data, isLoading, isError } = useGroup(group_id!);
  const [form, setForm] = useState({
    name: "",
    description: "",
    groupId: group_id!,
  });
  const { mutate: createSubGroup, isPending } = useCreateSubGroup();
  if (isLoading) return <Loader />;

  if (isError || !group_data || group_data.code == 404)
    return "There was an error while fetching the group. Please try again";

  function handleCreate() {
    createSubGroup(form);
  }

  const group = group_data?.data;
  return (
    <div className="min-h-full">
      <PageHeader
        title="Create Subgroup"
        desc={`Create a subgroup for the ${group.name} group.`}
        pageTitle={`Groups`}
        breadcrumb={false}
      />
      <div className="flex flex-col w-1/4 my-4 space-y-3">
        <div className="flex flex-col space-y-2">
          <label htmlFor="sub-grp-name">Name</label>
          <Input
            type="text"
            name="sub-grp-name"
            placeholder="Temperature Sensors"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="sub-grp-desc">Description</label>
          <Input
            type="text"
            name="sub-grp-desc"
            placeholder="All the temperature sensors we have"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="py-4">
          <Button onClick={handleCreate} disabled={isPending}>
            <span>Create Subgroup</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewSubGroup;
