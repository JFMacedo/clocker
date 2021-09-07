import * as yup from 'yup'
import { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react'
import { useFormik } from 'formik'

import { TimeBlockModal } from './TimeBlockModal'

export function TimeBlock({ time }) {
  const [isOpen, setIsOpen] = useState(false)

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Preenchimento obrigatório'),
    email: yup.string()
      .required('Preenchimento obrigatório')
      .email('E-mail inválido')
  })

  const formik = useFormik({
    onSubmit: () => {},
    validationSchema,
    initialValues: {
      name: '',
      email: ''
    }
  })
  
  function toggle() {
    setIsOpen(prevState => !prevState)
  }

  return (
    <Button colorScheme='blue' p='8' fontSize='xl' onClick={ toggle }>
      { time }
      <TimeBlockModal isOpen={ isOpen } onClose={ toggle }>
        <form>
          <Stack spacing='4'>
            <Input placeholder='Nome' />
            <Input placeholder='Email' />
          </Stack>
        </form>
      </TimeBlockModal>
    </Button>
  )
}