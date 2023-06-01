import {
  Button,
  Divider,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDeletePlace } from '~/api/useDeletePlace';
import { Place } from '~/types/Place';

interface PlacePopupProps {
  place: Place;
}

export const PlaceInfo = ({ place }: PlacePopupProps) => {
  const { name, description } = place;
  const { mutate: deletePlace, isLoading, isSuccess } = useDeletePlace();

  const handleDelete = async () => {
    deletePlace(place.id);
  };

  return (
    <VStack maxW={{ base: '70vw', sm: '300px' }} minW={'200px'}>
      {isLoading || isSuccess ? (
        <Spinner />
      ) : (
        <>
          <Heading color={'green.500'} as="h4" size={'md'}>
            {name}
          </Heading>

          <Text as={'p'} maxW={'100%'}>
            {description}
          </Text>
        </>
      )}

      <Divider />

      <Button
        size={'sm'}
        variant="ghost"
        onClick={handleDelete}
        isDisabled={isLoading}
      >
        Delete
      </Button>
    </VStack>
  );
};
