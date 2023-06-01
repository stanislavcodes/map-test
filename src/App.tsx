import { Button,Flex } from '@chakra-ui/react';
import { useCallback,useState } from 'react';
import { Map } from '~/components/Map';
import { useGetPlaces } from './api/useGetPlaces';
import { FormModal } from './components/AddForm';
import { Coords } from './types/Coords';
import { Place } from './types/Place';

function App() {
  const { data: places = [] } = useGetPlaces();
  const [data, setData] = useState<Partial<Place> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedPlace, setAddedPlace] = useState<Coords>(null);
  const [isEditing, setIsEditing] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = (latitude?: number, longitude?: number) => {
    setData(null);
    setIsModalOpen(false);
    setIsEditing(false);

    if (latitude && longitude) {
      setAddedPlace({ latitude, longitude });
    }
  };

  const startEditing = useCallback((place: Partial<Place>) => {
    setIsModalOpen(true);

    if (place.id) {
      setIsEditing(true);
    }

    setData(place);
  }, []);

  return (
    <Flex
      direction={'column'}
      w={'100%'}
      h={'100vh'}
      p={{ base: 4, md: 6 }}
      gap={4}
    >
      <Flex gap={4}>
        <Button onClick={openModal} colorScheme="green">
          Add place
        </Button>

        <FormModal
          isOpen={isModalOpen}
          isEditing={isEditing}
          initialData={data}
          onClose={closeModal}
        />
      </Flex>

      <Map
        places={places}
        addedPlace={addedPlace}
        onEdit={startEditing}
      />
    </Flex>
  );
}

export default App;
