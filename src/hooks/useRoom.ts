import { useQuery } from '@tanstack/react-query';

import api from '../api';

export default function useRoom(id: string) {
  return useQuery<{
    code: number;
    data: {
      id: string;
      name: string;
      properties: {
        time: string;
        [propertyName: string]: string;
      }[];
      createdAt: string;
      updatedAt: string;
    };
  }>({
    queryKey: ["room", id],
    queryFn: async () =>
      await api.read({
        entity: "rooms",
        id: id as string,
      }),
    enabled: !!id,
  });
}
