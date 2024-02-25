"use client"
import { trpc } from '@/app/_trpc/client';
import {
    Alert,
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
import { useState } from 'react';

export function LoginForm() {
    const [unable, setUnable] = useState(false)
    const [message, setMessage] = useState('')
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
                {message && <Alert color='red'>
                    Las credenciales no son correctas
                </Alert>}
                <form onSubmit={onSubmit(async ({username, password}) => {
                    setUnable(true)
                    setMessage('')
                    try {
                        const req = await signIn('credentials', {
                            redirect: false,
                            username, password
                        })
    
                        if (req?.ok) {
                            if (pathname === '/') router.push('/admin/partners')
                            else router.refresh()
                        } else {
                            setUnable(false)
                            if (req?.status === 401) {
                                setMessage('Credenciales incorrectas')
                            } else {
                                setMessage('Hubo un error, intentaló mas tarde')
                            }
                        }
    
                    } catch (error) {
                        console.dir(error)
                        setUnable(false)
                    }
                })}>
                    <TextInput {...getInputProps('username')} label="Usuario" required />
                    <PasswordInput {...getInputProps('password')} label="Contraseña" required mt="md" />
                    <Button disabled={unable} type='submit' fullWidth mt="xl">
                        Acceder a la aplicacion
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}