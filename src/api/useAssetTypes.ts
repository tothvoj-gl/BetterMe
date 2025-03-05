import {useQuery} from '@tanstack/react-query';
import {getAssetTypes} from './db';

export const useAssetTypes = () => {
  return useQuery({queryKey: ['assetTypes'], queryFn: getAssetTypes});
};
