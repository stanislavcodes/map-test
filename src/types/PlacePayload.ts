import { Place } from './Place';

export type PlacePayload = Omit<Place, 'id'>;
