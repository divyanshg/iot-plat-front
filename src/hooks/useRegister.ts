import { useMutation } from '@tanstack/react-query';

import api from '../api';

export default function useRegister() {
  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
      name: string;
    }) =>
      await api.post({
        entity: "auth/register",
        data,
      }),
    onSuccess: () => {
      window.location.href = "/";
    },
  });
}
