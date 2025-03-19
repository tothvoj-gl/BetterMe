import {useMutation} from '@tanstack/react-query';
import {loginWithEmailPassword, logout} from './auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: {email: string; password: string}) => {
      return loginWithEmailPassword(data.email, data.password);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
