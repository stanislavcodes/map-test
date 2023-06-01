import { useQuery } from '@tanstack/react-query';
import { Place } from '~/types/Place';
import { get } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useGetPlace = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => get<Place>(`${API_URL}/place/${id}`),
    refetchOnWindowFocus: false,
    retry: false,
  });
};
