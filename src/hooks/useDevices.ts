import api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from '../types';
import { Policy } from './usePolicies';

export type Device = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subGroup: {
    id: string;
    name: string;
  };
  policy: Pick<Policy, "id" | "name">;
  isOnline: boolean;
  lastSeen: string;
  certificateId: string;
};

export function useDevices() {
  return useQuery<ApiResponse<Device[]>>({
    queryKey: ["devices"],
    queryFn: async () =>
      await api.list({
        entity: "devices",
      }),
  });
}

export function useDevice(id: string) {
  return useQuery<ApiResponse<Device>>({
    queryKey: ["devices", id],
    queryFn: async () =>
      await api.read({
        entity: "devices",
        id,
      }),
  });
}

export function useCreateDevice() {
  return useMutation({
    mutationKey: ["devices"],
    mutationFn: async (device: {
      name: string;
      description?: string;
      policyId: string;
      subGroupId?: string | null | undefined;
    }): Promise<ApiResponse<string>> =>
      await api.create({
        entity: "devices",
        jsonData: device,
      }),
  });
}
