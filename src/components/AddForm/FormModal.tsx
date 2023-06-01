import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreatePlace } from '~/api/useCreatePlace';
import { useUpdatePlace } from '~/api/useUpdatePlace';
import { Place } from '~/types/Place';
import { PlacePayload } from '~/types/PlacePayload';

interface FormModalProps {
  isOpen: boolean;
  initialData: Place | null;
  onClose: (latitude?: number, longitude?: number) => void;
}

export const FormModal = ({ isOpen, initialData, onClose }: FormModalProps) => {
  const [editData, setEditData] = useState<PlacePayload | null>(null);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PlacePayload>({
    defaultValues: {
      name: editData?.name || '',
      description: editData?.description || '',
      latitude: editData?.latitude || 0,
      longitude: editData?.longitude || 0,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      const { latitude, longitude } = getValues();

      onCloseModal(latitude, longitude);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (initialData) {
      setEditData(initialData);
      setValue('name', initialData.name);
      setValue('description', initialData.description);
      setValue('latitude', initialData.latitude);
      setValue('longitude', initialData.longitude);
    }
  }, [initialData]);

  const { mutate: createPlace, isLoading: isCreating } = useCreatePlace();
  const { mutate: updatePlace, isLoading: isUpdating } = useUpdatePlace();

  const onSubmit: SubmitHandler<PlacePayload> = async values => {
    const data = {
      ...values,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
    };

    if (editData && initialData) {
      updatePlace({
        id: initialData.id,
        ...data,
      });
    } else {
      createPlace({
        ...data,
      });
    }
  };

  const onCloseModal = (latitude?: number, longitude?: number) => {
    setEditData(null);

    if (latitude && longitude) {
      onClose(latitude, longitude);
    } else {
      onClose();
    }

    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      isCentered
      size={{ base: 'full', md: 'md' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="green.500">Adding a new place</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={6} pb={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack
              spacing={{ base: 2, md: 4 }}
              align="flex-start"
              bg={'white'}
              rounded={'md'}
              height={'100%'}
            >
              <FormControl isDisabled={isSubmitting} isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="A beautiful place"
                  variant={'filled'}
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: 70,
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isDisabled={isSubmitting}
                isInvalid={!!errors.description}
              >
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter a description for a place"
                  minH={24}
                  resize={'none'}
                  variant={'filled'}
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: 350,
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isDisabled={isSubmitting || !!editData}
                isInvalid={!!errors.latitude}
              >
                <FormLabel>{'Latitude (-90, 90):'}</FormLabel>
                <Input
                  min={-90}
                  max={90}
                  variant={'filled'}
                  type="number"
                  step="any"
                  {...register('latitude', {
                    required: 'Latitude is required',
                    min: -90,
                    max: 90,
                  })}
                />
                <FormErrorMessage>
                  {errors.latitude && errors.latitude.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isDisabled={isSubmitting || !!editData}
                isInvalid={!!errors.longitude}
              >
                <FormLabel>{'Longitude (-180, 180):'}</FormLabel>
                <Input
                  min={-180}
                  max={180}
                  variant={'filled'}
                  type="number"
                  step="any"
                  {...register('longitude', {
                    required: 'Longitude is required',
                    min: -180,
                    max: 180,
                  })}
                />
                <FormErrorMessage>
                  {errors.longitude && errors.longitude.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="green"
                width="full"
                isLoading={isCreating || isUpdating}
                loadingText={editData ? 'Updating' : 'Creating'}
              >
                {editData ? 'Update' : 'Create'}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
