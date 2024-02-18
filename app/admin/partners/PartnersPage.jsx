"use client"
import { Card, Text } from "@mantine/core";
import { PartnersTable } from './PartnersTable';

export default function PartnersPage({ partners }) {
    return <Card>
        <Card.Section>
            <Text>Listado de socios</Text>
        </Card.Section>
        <PartnersTable partners={partners} />
    </Card>;
}
