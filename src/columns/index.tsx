import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Certificate } from '@/hooks/useCertificates';
import { Device } from '@/hooks/useDevices';
import { readableTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

import { Policy } from '../hooks/usePolicies';

export const deviceColumns: ColumnDef<Device>[] = [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">
        <span>{row.getValue("description")}</span>
      </div>
    ),
  },
  {
    accessorKey: "isOnline",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isOnline") ? (
          <Badge className="bg-green-100">
            <span className="font-semibold text-green-600">online</span>
          </Badge>
        ) : (
          <Badge className="bg-red-100">
            <span className="font-semibold text-red-600">offline</span>
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "lastSeen",
    header: "Last seen",
    cell: ({ row }) => (
      <div className="capitalize">
        <span>{readableTime(row.getValue("lastSeen"))}</span>
      </div>
    ),
  },
];

export const certColumns: ColumnDef<Certificate>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">
        <Link
          target="_blank"
          to={`http://localhost:3000/certificates/download/${row.getValue(
            "id"
          )}`}
        >
          <span className="text-blue-600 hover:text-blue-700 hover:underline">
            {row.getValue("id")}
          </span>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("status") == "ACTIVE" ? (
          <Badge className="bg-green-100">
            <span className="font-semibold text-green-600">ACTIVATED</span>
          </Badge>
        ) : (
          <Badge className="bg-red-100">
            <span className="font-semibold text-red-600">DEACTIVATED</span>
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">
        <span>{row.getValue("type")}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <div className="capitalize">
        <span>{readableTime(row.getValue("createdAt"))}</span>
      </div>
    ),
  },
];

export const policyColumns: ColumnDef<Policy>[] = [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">
        <span>{row.getValue("description") || "-"}</span>
      </div>
    ),
  },
  {
    accessorKey: "certificateId",
    header: "Certificate",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("certificateId") ? (
          <Link to={`../certificates/${row.getValue("certificateId")}`}>
            <span className="text-blue-600 hover:text-blue-700 hover:underline">
              {row.getValue("certificateId")}
            </span>
          </Link>
        ) : (
          <span>No certificate</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <div className="capitalize">
        <span>{readableTime(row.getValue("createdAt"))}</span>
      </div>
    ),
  },
];
