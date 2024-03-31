import api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from '../types';
import { Device } from './useDevices';

export type SubGroup = {
  id: string;
  name: string;
  description?: string;
  devices: Device[];
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  subGroups: Pick<SubGroup, "id">[];
};

export function useGroups() {
  return useQuery<ApiResponse<Group[]>>({
    queryKey: ["groups"],
    queryFn: async () =>
      await api.list({
        entity: "groups",
      }),
    initialData: {
      code: 0,
      message: "",
      data: [],
    },
  });
}

export function useSubGroups(group_id: string) {
  return useQuery<ApiResponse<SubGroup[]>>({
    queryKey: ["subgroups", group_id],
    queryFn: async () =>
      await api.list({
        entity: `subgroups/${group_id}`,
      }),
    initialData: {
      code: 0,
      message: "",
      data: [],
    },
    enabled: !!group_id && group_id.length > 0,
  });
}

export function useGroup(id: string) {
  return useQuery<ApiResponse<Group>>({
    queryKey: ["groups", id],
    queryFn: async () =>
      await api.read({
        entity: "groups",
        id,
      }),
    enabled: !!id,
  });
}

export function useSubGroup(id: string) {
  return useQuery<ApiResponse<SubGroup>>({
    queryKey: ["subGroup", id],
    queryFn: async () =>
      await api.read({
        entity: "subgroups",
        id,
      }),
    enabled: !!id,
  });
}

export function useCreateSubGroup() {
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      groupId: string;
    }) => await api.create({ entity: "subgroups", jsonData: data }),
  });
}

export function useCreateGroup() {
  return useMutation({
    mutationKey: ["groups"],
    mutationFn: async (
      group: Pick<Group, "name" | "description">
    ): Promise<ApiResponse<string>> =>
      await api.create({
        entity: "groups",
        jsonData: group,
      }),
  });
}
