import { PlacePayload } from './PlacePayload';

export type SelectedPlace = Omit<PlacePayload, 'name' | 'description'> | null;
