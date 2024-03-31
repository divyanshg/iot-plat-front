import { useInfiniteQuery } from '@tanstack/react-query';

import api from '../api';

interface Room {
  id: string;
  name: string;
  properties: {
    time: string;
    [propertyName: string]: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export type ResponseWithPagination<T> = {
  code: number;
  message: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
};

export default function useGetRooms() {
  return useInfiniteQuery({
    queryKey: ["rooms"],
    queryFn: async ({ pageParam = 1 }) =>
      await api.list({
        entity: "rooms",
        options: {
          page: pageParam,
          limit: 12,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ResponseWithPagination<Room[]>) => {
      const hasNext: boolean = lastPage.page < lastPage.total_pages;
      if (hasNext) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
