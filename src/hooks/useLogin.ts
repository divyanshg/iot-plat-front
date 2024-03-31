import { useMutation } from '@tanstack/react-query';

import api from '../api';
import { useAuth, User } from './useAuth';

interface Response {
  code: number;
  message: string;
  data: { user: User; access_token: string };
}

export default function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) =>
      await api.post<Response>({
        entity: "auth/login",
        data,
      }),
    onSuccess: (res: Response) => login(res.data.user),
  });
}
