import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Place } from '~/types/Place';
import { del } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useDeletePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => del<Place>(`${API_URL}/place/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['places'],
      });
    },
  });
};
