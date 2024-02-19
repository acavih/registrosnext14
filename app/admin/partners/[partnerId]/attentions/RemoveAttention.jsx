"use client"
import { Box, Button, Grid, LoadingOverlay, Modal, Text, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ResourceInput from '@/components/ResourceInput'
import ResourceInputMultiple from '@/components/ResourceInputMultiple'
import { DateTimeInput } from '../../../../../components/DateTimeInput';
import useFetch from 'use-http'
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

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

export default function AddPartnerForm({partner, attention}) {
  const router = useRouter()
  const {loading, delete: remove} = useFetch('/api/admin/attentions?attention=' + attention._id)
  const [opened, { open, close }] = useDisclosure(false);
  const {onSubmit, getInputProps} = useForm({
    initialValues: {
      fechaatencion: null,
      fechacosaspendientes: null,
      comentario: '',
      cosaspendientes: '',
      lugaratencion: '',
      tipoaenciones: [],
      Proyectos: [],
      motivosatencion: [],
      derivadoa: [],
      derivadode: [],
      formacion: [],
      voluntariado: []
    }
  })

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} lockScroll={true} title={"Eliminar atención de: " + partner.nombre + " " + partner.apellidos}>
        <Box pos={'relative'}>
          <LoadingOverlay visible={loading} zIndex={5000} overlayProps={{ radius: "sm", blur: 2 }} />
          <Text>Estas seguro que deseas eliminar la atencion de { partner.nombre + " " + partner.apellidos} del {dayjs(attention.fechaatencion).format('DD/MM/YYYY')}</Text>
          <Button color='red' onClick={async () => {
            await remove()
            close()
            router.refresh()
          }}>
            Eliminar
          </Button>
        </Box>
      </Modal>

      <Button color='red' size='xs' onClick={async () => {
        open()
      }}>Eliminar</Button>
    </>
  );
}