import {useMutation, useQueryClient} from '@tanstack/react-query';
import {setUserData} from './db';
import {User} from '../model/types';

export const useSetUserData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: User) => setUserData(user),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['userData']});
    },
  });
};
