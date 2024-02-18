"use client"
import { Button, Grid, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import ResourceInput from '@/components/ResourceInput'
import { DateTimeInput } from '../../../../components/DateTimeInput';
import useFetch from 'use-http'
import { useRouter } from 'next/navigation';

export default function EditPartnerForm({partner}) {
  const router = useRouter()
  const {put} = useFetch('/api/admin/partners?partnerId=' + partner._id)
  const [opened, { open, close }] = useDisclosure(false);
  const {onSubmit, getInputProps} = useForm({
    initialValues: {
      codigo: partner.codigo,
      nombre: partner.nombre,
      apellidos: partner.apellidos,
      fechanacimiento: new Date(partner.fechanacimiento),
      sipcard: partner.sipcard,
      correoelectronico: partner.correoelectronico,
      telefono: partner.telefono,
      observaciones: partner.observaciones,
      cosaspendientes: partner.cosaspendientes,
      sexo: partner.sexo?._id,
      socioono: partner.socioono?._id,
      nacionalidad: partner.nacionalidad?._id,
      ciudadresidencia: partner.ciudadresidencia?._id,
      howDidKnowUs: partner.howDidKnowUs?._id,
      yearDidKnowus: partner.yearDidKnowus?._id
    }
  })

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} title="Editar socio">
        <form onSubmit={onSubmit(async values => {
          await put(values)
          router.refresh()
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
              <Button type='submit'>Guardar cambios</Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>

      <Button onClick={open}>Editar socio</Button>
    </>
  );
}