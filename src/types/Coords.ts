import { PlacePayload } from './PlacePayload';

export type Coords = Omit<PlacePayload, 'name' | 'description'> | null;
