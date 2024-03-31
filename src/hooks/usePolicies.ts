import api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from '../types';
import { Device } from './useDevices';

export type Policy = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  allowConnect: boolean;
  publishTopics: string[];
  subscribeTopics: string[];
  certificateId: string;
  devices: Pick<Device, "id" & "name">[];
};

export function usePolicies() {
  return useQuery<ApiResponse<Policy[]>>({
    queryKey: ["policies"],
    queryFn: async () =>
      await api.list({
        entity: "policies",
      }),
  });
}

export function usePolicy(id: string) {
  return useQuery<ApiResponse<Policy>>({
    queryKey: ["policies", id],
    queryFn: async () =>
      await api.read({
        entity: "policies",
        id,
      }),
    enabled: !!id,
  });
}

export function useCreatePolicy() {
  return useMutation({
    mutationKey: ["policies"],
    mutationFn: async (policy: Policy): Promise<ApiResponse<string>> =>
      await api.create({
        entity: "policies",
        jsonData: policy,
      }),
  });
}
