"use client"
import { Box, Button, Grid, LoadingOverlay, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ResourceInput from '@/components/ResourceInput'
import ResourceInputMultiple from '@/components/ResourceInputMultiple'
import { DateTimeInput } from '../../../../../components/DateTimeInput';
import useFetch from 'use-http'
import { useRouter } from 'next/navigation';

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
  const {post, loading} = useFetch('/api/admin/attentions?partnerId=' + partner._id)
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
      <Modal opened={opened} onClose={close} size={'xl'} lockScroll={true} title={"Añadir atención para: " + partner.nombre + " " + partner.apellidos}>
        <Box pos={'relative'}>
        <LoadingOverlay visible={loading} zIndex={5000} overlayProps={{ radius: "sm", blur: 2 }} />
          <form onSubmit={onSubmit(async values => {
            await post(values)
            close()
            router.refresh()
          })}>
            <Grid>
              <Grid.Col span={12}>
                <DateTimeInput label="Fecha de atencion" {...getInputProps('fechaatencion')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea label="Comentario" {...getInputProps('comentario')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Lugar de atencion" type={'lugaratencions'} {...getInputProps('lugaratencion')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Tipos de atenciones" type={'tipoatenciones'} {...getInputProps('tipoaenciones')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Proyectos" type={'proyectos'} {...getInputProps('Proyectos')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Motivos de atencion" type={'motivosatencions'} {...getInputProps('motivosatencion')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Derivado a" type={'derivaciones'} {...getInputProps('derivadoa')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Derivado de" type={'derivaciones'} {...getInputProps('derivadode')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Formaciones" type={'formacions'} {...getInputProps('formacion')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInputMultiple label="Voluntariados" type={'voluntariados'} {...getInputProps('voluntariado')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <DateTimeInput label="Fecha cosas pendientes" {...getInputProps('fechacosaspendientes')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea label="Cosas pendientes" {...getInputProps('cosaspendientes')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button type='submit'>Guardar atencion</Button>
              </Grid.Col>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Button onClick={open}>Añadir atencion</Button>
    </>
  );
}