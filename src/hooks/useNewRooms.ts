import { useMutation } from '@tanstack/react-query';

import api from '../api';

export default function () {
  return useMutation({
    mutationKey: ["rooms"],
    mutationFn: async (
      jsonData: ({ name: string } | undefined)[]
    ): Promise<unknown> =>
      await api.post({
        entity: "rooms/create-many",
        data: {
          rooms: jsonData,
        },
      }),
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 800);
    },
  });
}
