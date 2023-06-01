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
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreatePlace } from '~/api/useCreatePlace';

interface FormValues {
  name: string;
  description: string;
  latitude: number | '';
  longitude: number | '';
}

interface FormModalProps {
  isOpen: boolean;
  onClose: (latitude?: number, longitude?: number) => void;
}

export const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
      });
    }
  }, [isSubmitSuccessful, reset]);

  const { mutate: createPlace, isLoading } = useCreatePlace();

  const onSubmit: SubmitHandler<FormValues> = async values => {
    createPlace({
      ...values,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
    });

    onClose(Number(values.latitude), Number(values.longitude));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
                isDisabled={isSubmitting}
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
                isDisabled={isSubmitting}
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
                isLoading={isLoading}
                loadingText="Creating"
              >
                Create
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
