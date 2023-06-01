import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Place } from '~/types/Place';
import { PlacePayload } from '~/types/PlacePayload';
import { post } from '~/utils/requests';

const API_URL = import.meta.env.VITE_API_URL;

export const useCreatePlace = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (place: PlacePayload) =>
      post<PlacePayload, Place>(`${API_URL}/place`, {
        name: place.name,
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] });

      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
