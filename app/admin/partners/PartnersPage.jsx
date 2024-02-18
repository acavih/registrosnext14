"use client"
import { Box, Card, Text, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import AddPartnerForm from './AddPartnerForm';
import { PartnersTable } from './PartnersTable';

export default function PartnersPage({ partners, s = '' }) {
    const router = useRouter()
    const [value, setValue] = useState(s)
    const [debouncedValue] = useDebounce(value, 500);

    useEffect(() => {
        router.push('/admin/partners?s=' + value)
    }, [debouncedValue])

    return <Card>
        <Card.Section>
            <Box display={'flex'} style={{justifyContent: 'space-between', alignItems: 'center'}}>
                <Text size="lg">Listado de socios</Text>
                <AddPartnerForm />
            </Box>
        </Card.Section>
        <Card.Section>
            <TextInput placeholder="Introduzca aquí el texto de su busqueda"
                label={"Buscar socio"} value={value} onChange={(e) => setValue(e.target.value)} />
        </Card.Section>
        <PartnersTable partners={partners} />
    </Card>;
}
