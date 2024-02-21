"use client"
import { ActionIcon, Button, Table } from '@mantine/core';
import { useState } from 'react';
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Link from 'next/link';

export function PartnersTable({ partners }) {
    return (
        <Table.ScrollContainer>
            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Nombre</Table.Th>
                        <Table.Th>Apellidos</Table.Th>
                        <Table.Th>Correo electrónico</Table.Th>
                        <Table.Th>SIP</Table.Th>
                        <Table.Th>Acciones</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {partners.map((element) => (
                        <PartnerRow key={element._id} element={element} />
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

function PartnerRow({ element }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <ActionIcon variant='transparent' onClick={() => setExpanded(!expanded)}>
                        {expanded ? <IconChevronUp /> : <IconChevronDown />}
                    </ActionIcon>
                </Table.Td>
                <Table.Td>{element.nombre}</Table.Td>
                <Table.Td>{element.apellidos}</Table.Td>
                <Table.Td>{element.correoelectronico}</Table.Td>
                <Table.Td>{element.sipcard}</Table.Td>
                <Table.Td>
                    <Button component={Link} href={'/admin/partners/' + element._id} size='xs'>Ver socio</Button>
                </Table.Td>
            </Table.Tr>
            {expanded && <Table.Tr>
                <Table.Td colSpan={12}>
                    Hola mundooooo
                </Table.Td>
            </Table.Tr>}
        </>
    )
}
