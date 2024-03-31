import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

import DataTable from '@/components/DataTable';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Group, useGroups } from '@/hooks/useGroups';
import { ColumnDef } from '@tanstack/react-table';

function Groups() {
  const { data, isLoading, refetch, isRefetching } = useGroups();
  const columns: ColumnDef<Group>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">
          <Link to={row.original.id}>
            <span className="text-blue-600 hover:text-blue-700 hover:underline">
              {row.getValue("name")}
            </span>
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "subGroups",
      header: "Sub groups",
      cell: ({ row }) => (
        <div className="capitalize">
          {(row.getValue("subGroups") as unknown[])
            ? (row.getValue("subGroups") as unknown[]).length
            : 0}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const groups = data?.data;

  return (
    <div className="min-h-full">
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">Groups</h1>
        <p className="text-lg font-light">
          Groups let you organize your devices. Select a group to continue.
        </p>
      </div>
      <div className="flex-1 py-2">
        {groups?.length === 0 ? (
          <EmptyState link="new" text="Create a group" />
        ) : (
          <DataTable
            data={groups!}
            columns={columns}
            showNewButton
            newButtonLabel="Create group"
            searchColumn="name"
            searchPlaceholder="Search groups..."
            showRefreshButton
            showSearch
            isRefetching={isRefetching}
            onRefresh={refetch}
          />
        )}
      </div>
    </div>
  );
}

export default Groups;
