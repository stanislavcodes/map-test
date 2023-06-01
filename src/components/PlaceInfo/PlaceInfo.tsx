import {
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDeletePlace } from '~/api/useDeletePlace';
import { Place } from '~/types/Place';

interface PlacePopupProps {
  place: Place;
  onEdit: () => void;
}

export const PlaceInfo = ({ place, onEdit }: PlacePopupProps) => {
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

      <Flex w={'100%'} gap={1}>
        <Button
          colorScheme="green"
          size={'sm'}
          onClick={onEdit}
          flexGrow={1}
          isDisabled={isLoading}
        >
          Edit
        </Button>
        <Button
          size={'sm'}
          variant="ghost"
          colorScheme='red'
          onClick={handleDelete}
          flexGrow={1}
          isDisabled={isLoading}
        >
          Delete
        </Button>
      </Flex>
    </VStack>
  );
};
