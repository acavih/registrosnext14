"use client"
import { Box, Button, Grid, LoadingOverlay, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ResourceInput from '@/components/ResourceInput'
import ResourceInputMultiple from '@/components/ResourceInputMultiple'
import { DateTimeInput } from '../../../../../components/DateTimeInput';
import useFetch from 'use-http'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

export default function UpdatePartnerAttentionForm({attention, partner}) {
  const router = useRouter()
  const {put, loading} = useFetch('/api/admin/attentions?attention=' + attention._id)
  const [opened, { open, close }] = useDisclosure(false);
  const {onSubmit, getInputProps} = useForm({
    initialValues: {
      fechaatencion: attention.fechaatencion ? new Date(attention.fechaatencion) : null,
      fechacosaspendientes: attention.fechacosaspendientes ? new Date(attention.fechacosaspendientes) : null,
      comentario: attention.comentario,
      cosaspendientes: attention.cosaspendientes,
      lugaratencion: attention.lugaratencion?._id,
      tipoaenciones: attention.tipoaenciones?.map(a => a._id) ?? [],
      Proyectos: attention.Proyectos?.map(a => a._id) ?? [],
      motivosatencion: attention.motivosatencion?.map(a => a._id) ?? [],
      derivadoa: attention.derivadoa?.map(a => a._id) ?? [],
      derivadode: attention.derivadode?.map(a => a._id) ?? [],
      formacion: attention.formacion?.map(a => a._id) ?? [],
      voluntariado: attention.voluntariado?.map(a => a._id) ?? []
    }
  })

  useEffect(() => {
    if (opened)
    console.log('UPDATE', attention)
  }, [opened])

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} lockScroll={true} title={"Añadir atención para: " + partner.nombre + " " + partner.apellidos}>
        <Box pos={'relative'}>
        <LoadingOverlay visible={loading} zIndex={5000} overlayProps={{ radius: "sm", blur: 2 }} />
          <form onSubmit={onSubmit(async values => {
            await put(values)
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
                <Button type='submit'>Guardar cambios</Button>
              </Grid.Col>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Button size='xs' onClick={open}>Editar atencion</Button>
    </>
  );
}