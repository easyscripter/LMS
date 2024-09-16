import { apiService } from '@/services/apiService';
import { useQuery } from '@tanstack/react-query';

export const useGetUserCourses = () => useQuery({
	queryKey: ['userCourses'],
	queryFn: () => apiService.getUserCourses(),
});