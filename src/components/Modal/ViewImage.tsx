import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="900px" maxH="632px" bgColor="pGray.800">
        <ModalBody
          w="100%"
          h="100%"
          maxW="900px"
          maxH="600px"
          border="none"
          p="0"
        >
          <Image
            src={imgUrl}
            alt="imagem"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </ModalBody>
        <ModalFooter flex="1" justifyContent="flex-start">
          <Link
            href={imgUrl}
            isExternal
            _focus={{ outline: 'none', boxShadow: 'none' }}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
