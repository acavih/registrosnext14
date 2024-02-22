"use client"
import { trpc } from '@/app/_trpc/client';
import {
    Button,
    Container,
    Paper,
    PasswordInput,
    TextInput,
    Title
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export function LoginForm() {
    const router = useRouter()
    const pathname = usePathname()
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
                <form onSubmit={onSubmit(async ({username, password}) => {
                    const req = await signIn('credentials', {
                        redirect: false,
                        username, password
                    })

                    console.log(req)

                    if (req?.ok) {
                        if (pathname === '/') router.push('/admin/partners')
                        else router.refresh()
                    }
                })}>
                    <TextInput {...getInputProps('username')} label="Usuario" required />
                    <PasswordInput {...getInputProps('password')} label="Contraseña" required mt="md" />
                    <Button type='submit' fullWidth mt="xl">
                        Acceder a la aplicacion
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}