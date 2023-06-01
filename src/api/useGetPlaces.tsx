import { useQuery } from '@tanstack/react-query';
import { Place } from '~/types/Place';
import { get } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetPlaces = () => {
  return useQuery({
    queryKey: ['places'],
    queryFn: () => get<Place[]>(`${API_URL}/place`),
    refetchOnWindowFocus: false,
  });
};
