"use client"
import { Box, Button, LoadingOverlay, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useFetch from 'use-http';

/**
[
  'Actividades',        'Autotest',
  'anioConocio',        'comoNosConoció',
  'derivaciones',       'enfermedad',
  'formacions',         'lugaratencions',
  'motivosatencions',   'nacionalidads',
  'nuevoTipoDeRecurso', 'proyectos',
  'residencias',        'sexos',
  'socioonos',          'tipoatenciones',
  'voluntariados'
]
 */

export default function AddPartnerForm({partner}) {
  const router = useRouter()
  const {loading, delete: remove} = useFetch('/api/admin/partners?partnerId=' + partner._id)
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} lockScroll={true} title={"Eliminar socio: " + partner.nombre + " " + partner.apellidos}>
        <Box pos={'relative'}>
          <LoadingOverlay visible={loading} zIndex={5000} overlayProps={{ radius: "sm", blur: 2 }} />
          <Text>Estas seguro que deseas eliminar el socio { partner.nombre + " " + partner.apellidos}</Text>
          <Button color='red' onClick={async () => {
            await remove()
            close()
            router.push('/admin/partners')
          }}>
            Eliminar
          </Button>
        </Box>
      </Modal>

      <Button color='red' onClick={async () => {
        open()
      }}>Eliminar</Button>
    </>
  );
}