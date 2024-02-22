"use client"
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    TextInput,
    Title
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function LoginForm() {
    const { getInputProps, onSubmit,  } = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    })

    return (
        <Container size={420} my={40}>
            <Title ta="center">
                Bienvenido
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={onSubmit(values => {
                    console.log(values)
                })}>
                    <TextInput label="Usuario" required />
                    <PasswordInput label="Contraseña" required mt="md" />
                    <Button type='submit' fullWidth mt="xl">
                        Acceder a la aplicacion
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}