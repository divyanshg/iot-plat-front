import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateGroup } from '@/hooks/useGroups';

function NewGroup() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { mutate: createGroup, isPending } = useCreateGroup();

  function handleCreate() {
    if (name.length == 0) return;
    createGroup({
      name,
      description: desc,
    });
    setName("");
    setDesc("");
  }

  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Create a group</h1>
        <p className="text-lg font-light">
          Groups let you organize your devices. Select a group to continue.
        </p>
      </div>
      <div className="flex-1 py-4 mt-4">
        <div className="flex flex-col w-1/3 space-y-3">
          <div>
            <h4 className="font-semibold">Enter group name</h4>
            <h6 className="font-light">This will be the name of the group.</h6>
          </div>
          <div>
            <Input
              name="group-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h4 className="font-semibold">Enter description</h4>
          </div>
          <div>
            <Input
              name="group-description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
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

export default NewGroup;
