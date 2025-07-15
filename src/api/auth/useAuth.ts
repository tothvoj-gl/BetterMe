import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  getCurrentUser,
  loginWithEmailPassword,
  logout,
  registerWithEmailPassword,
  subscribeToUserChanges,
} from './auth';
import {useEffect} from 'react';

export const useSubscribeToUserChanges = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    return subscribeToUserChanges(user => {
      queryClient.setQueryData(['currentUser'], user);
    });
  }, [queryClient]);
};

export const useCurrentUser = () => {
  return useQuery({queryKey: ['currentUser'], queryFn: getCurrentUser});
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {email: string; password: string}) => {
      console.log('calllling');

      return loginWithEmailPassword(data.email, data.password);
    },
    onSuccess: user => {
      console.log('onSuccesssssss');
      console.log(user);

      queryClient.setQueryData(['currentUser'], user);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {email: string; password: string}) => {
      return registerWithEmailPassword(data.email, data.password);
    },
    onSuccess: user => {
      queryClient.setQueryData(['currentUser'], user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
      queryClient.setQueryData(['userData'], null);
    },
  });
};
