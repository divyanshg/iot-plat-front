import api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { ApiResponse } from '../types';

export type Certificate = {
  id: string;
};

export function useCertificates() {
  return useQuery<ApiResponse<Certificate[]>>({
    queryKey: ["certificates"],
    queryFn: async () =>
      await api.list({
        entity: "certificates",
      }),
  });
}

export function useCertificate(id: string) {
  return useQuery<ApiResponse<Certificate>>({
    queryKey: ["certificates", id],
    queryFn: async () =>
      await api.read({
        entity: "certificates",
        id,
      }),
  });
}

export function useCreateCertificate() {
  return useMutation({
    mutationKey: ["certificates"],
    mutationFn: async (certificate: {
      type: "NORMAL" | "CLAIM";
      policy_id: string;
      status: "ACTIVE" | "INACTIVE";
    }): Promise<ApiResponse<string>> =>
      await api.create({
        entity: "certificates",
        jsonData: certificate,
      }),
    onSuccess: ({ data }) => {
      //check if data is a link
      if (data.startsWith("http")) {
        //open the link in a new tab
        window.open(data, "_blank");
      }
    },
    // onError: () => onError(),
  });
}
