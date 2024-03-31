import { useMutation } from '@tanstack/react-query';

import api from '../api';

export default function useNewRoom() {
  return useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (jsonData: Record<string, string>): Promise<unknown> =>
      await api.create({ entity: "rooms", jsonData }),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 800);
    },
  });
}
