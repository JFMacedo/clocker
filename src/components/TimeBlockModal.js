import { Button, Modal, ModalBody, ModalContent } from '@chakra-ui/react'
import { ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

export function TimeBlockModal({ isOpen, onClose, onComplete, children }) {

  return (
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reservar horário</ModalHeader>
        <ModalBody>
          { children }
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr='3' onClick={ onClose }>Cancelar</Button>
          <Button colorScheme='blue' onClick={ onComplete }>
            Reservar horário
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}