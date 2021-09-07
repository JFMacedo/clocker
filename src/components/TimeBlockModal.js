import { Button, Modal, ModalBody, ModalContent } from '@chakra-ui/react'
import { ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

export function TimeBlockModal({
  isOpen,
  onClose,
  onComplete,
  isSubmitting,
  children
}) {

  return (
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reservar horário</ModalHeader>
        <ModalBody>
          { children }
        </ModalBody>

        <ModalFooter>
          { !isSubmitting && (
            <Button variant='ghost' mr='3' onClick={ onClose }>Cancelar</Button>
          )}
          <Button colorScheme='blue' onClick={ onComplete } isLoading={ isSubmitting }>
            Reservar horário
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}