import { apiService } from '@/services/apiService';
import { useQuery } from '@tanstack/react-query';

export const useGetUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => apiService.getUser(),
  });
