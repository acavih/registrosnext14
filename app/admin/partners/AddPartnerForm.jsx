"use client"
import { Box, Button, Grid, LoadingOverlay, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ResourceInput from '@/components/ResourceInput'
import { DateTimeInput } from '../../../components/DateTimeInput';
import useFetch from 'use-http'

export default function AddPartnerForm() {
  const {post, loading} = useFetch('/api/admin/partners')
  const [opened, { open, close }] = useDisclosure(false);
  const {onSubmit, getInputProps} = useForm({
    initialValues: {
      codigo: '',
      nombre: '',
      apellidos: '',
      fechanacimiento: null,
      sipcard: '',
      correoelectronico: '',
      telefono: '',
      observaciones: '',
      cosaspendientes: '',
      sexo: '',
      socioono: '',
      nacionalidad: '',
      ciudadresidencia: '',
      howDidKnowUs: '',
      yearDidKnowus: ''
    }
  })

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} lockScroll={true} title="Añadir socio">
        <Box pos={'relative'}>
        <LoadingOverlay visible={loading} zIndex={5000} overlayProps={{ radius: "sm", blur: 2 }} />
          <form onSubmit={onSubmit(async values => {
            await post(values)
            close()
          })}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput label="Código" {...getInputProps('codigo')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Nombre" {...getInputProps('nombre')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Apellidos" {...getInputProps('apellidos')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <DateTimeInput label="Fecha de nacimiento" {...getInputProps('fechanacimiento')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Tarjeta sip" {...getInputProps('sipcard')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Telefono" {...getInputProps('telefono')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Correo electrónico" {...getInputProps('correoelectronico')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea label="Observaciones" {...getInputProps('observaciones')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Textarea label="Cosas pendientes" {...getInputProps('cosaspendientes')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Sexo" type={'sexos'} {...getInputProps('sexo')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Nacionalidad" type={'nacionalidads'} {...getInputProps('nacionalidad')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Ciudad de residencia" type={'residencias'} {...getInputProps('ciudadresidencia')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Socio o no" type={'socioonos'} {...getInputProps('socioono')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Como nos conoció" type={'comoNosConoció'} {...getInputProps('howDidKnowUs')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <ResourceInput label="Año que nos conocio" type={'anioConocio'} {...getInputProps('yearDidKnowus')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button type='submit'>Guardar socio</Button>
              </Grid.Col>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Button onClick={open}>Añadir socio</Button>
    </>
  );
}