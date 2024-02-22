"use client"
import { Box, Card, Grid, Group, Text, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import AddPartnerForm from './AddPartnerForm';
import { PartnersTable } from './PartnersTable';
import Stat from "@/components/Stat";
import Link from "next/link";

export default function PartnersPage({ partners, s = '' }) {
    const router = useRouter()
    const [value, setValue] = useState(s)
    const [debouncedValue] = useDebounce(value, 500);

    useEffect(() => {
        router.push('/admin/partners?s=' + value)
    }, [debouncedValue])

    return (
        <div>
            <Card>
                <Box display={'flex'} style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Title>Listado de socios</Title>
                    <AddPartnerForm />
                </Box>
                <Grid>
                    {/* <Stat stat={{title: 'Miembros con cosas pendientes', value: 80}} /> */}
                </Grid>
                <TextInput placeholder="Introduzca aquí el texto de su busqueda"
                    label={"Buscar socio"} value={value} onChange={(e) => setValue(e.target.value)} />
            </Card>
            <Card>
                <PartnersTable partners={partners} />
            </Card>
        </div>
    )
}
