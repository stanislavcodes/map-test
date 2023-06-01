import { Button,Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Map } from '~/components/Map';
import { useGetPlaces } from './api/useGetPlaces';
import { FormModal } from './components/AddForm';
import { SelectedPlace } from './types/SelectedPlace';

function App() {
  const { data: places = [] } = useGetPlaces();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace>(null);

  const openModal = () => setIsModalOpen(true);

  const closeModal = (latitude?: number, longitude?: number) => {
    setIsModalOpen(false);

    if (latitude && longitude) {
      setSelectedPlace({ latitude, longitude });
    }
  };

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

        <FormModal isOpen={isModalOpen} onClose={closeModal} />
      </Flex>

      <Map places={places} selectedPlace={selectedPlace} />
    </Flex>
  );
}

export default App;
