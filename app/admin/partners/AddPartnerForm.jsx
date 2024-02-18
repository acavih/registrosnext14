"use client"
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function AddPartnerForm() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} title="Añadir socio">
        <p>Formulario</p>
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
}