"use client"
import { Box, Button, Grid, LoadingOverlay, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import useFetch from 'use-http'

export default function EditResourceForm({resource}) {
  const router = useRouter()
  const {put, loading} = useFetch('/api/admin/resources?id=' + resource._id)
  const [opened, { open, close }] = useDisclosure(false);

  const {onSubmit, getInputProps} = useForm({
    initialValues: {
      name: resource.name,
      type: resource.type
    }
  })

  return (
    <>
      <Modal opened={opened} onClose={close} size={'xl'} lockScroll={true} title="Añadir socio">
        <Box pos={'relative'}>
        <LoadingOverlay visible={loading} zIndex={5000} overlayProps={{ radius: "sm", blur: 2 }} />
          <form onSubmit={onSubmit(async values => {
            await put(values)
            close()
            router.refresh()
          })}>
            <Grid>
              <Grid.Col span={12}>
                <TextInput label="Nombre del recurso" {...getInputProps('name')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput readOnly label="Tipo del recurso" {...getInputProps('type')} />
              </Grid.Col>
              <Grid.Col span={12}>
                <Button type='submit'>Guardar cambios</Button>
              </Grid.Col>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Button onClick={open} size='xs'>Editar recurso</Button>
    </>
  );
}