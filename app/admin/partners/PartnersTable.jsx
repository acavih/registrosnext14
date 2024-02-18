"use client"
import { Table } from '@mantine/core';

export function PartnersTable({ partners }) {
    return <Table>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Apellidos</Table.Th>
                <Table.Th>Correo electrónico</Table.Th>
                <Table.Th>SIP</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            {partners.map((element) => (
                <Table.Tr key={element._id}>
                    <Table.Td>{element.nombre}</Table.Td>
                    <Table.Td>{element.apellidos}</Table.Td>
                    <Table.Td>{element.correoelectronico}</Table.Td>
                    <Table.Td>{element.sipcard}</Table.Td>
                </Table.Tr>
            ))}
        </Table.Tbody>
    </Table>;
}
