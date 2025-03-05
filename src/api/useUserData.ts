import {useQuery} from '@tanstack/react-query';
import {getUserData} from './db';

export const useUserData = () => {
  return useQuery({queryKey: ['userData'], queryFn: getUserData});
};
