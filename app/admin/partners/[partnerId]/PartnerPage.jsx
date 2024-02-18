"use client"
import EditPartnerForm from './EditPartnerForm'
import { Alert, Box, Card, Table, Text } from "@mantine/core";
import dayjs from 'dayjs'

export default function PartnerPage({ partner }) {
    return (
        <div>
            <Card>
                <Card.Section>
                    <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
                        <Text size="xl">{partner.nombre} {partner.apellidos}</Text>
                        <EditPartnerForm partner={partner} />
                    </Box>
                </Card.Section>
            </Card>
            <Card>
                <Table striped>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Th>Codigo</Table.Th>
                            <Table.Td>{partner.codigo}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Nombre</Table.Th>
                            <Table.Td>{partner.nombre}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Apellidos</Table.Th>
                            <Table.Td>{partner.apellidos}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Fecha de nacimiento</Table.Th>
                            <Table.Td>{dayjs(partner.fechanacimiento).locale('es').format('DD/MM/YYYY')} ({partner.edad} años)</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Correo electrónico</Table.Th>
                            <Table.Td>{partner.correoelectronico}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Telefono</Table.Th>
                            <Table.Td>{partner.telefono}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Sexo</Table.Th>
                            <Table.Td>{partner.sexo?.name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Nacionalidad</Table.Th>
                            <Table.Td>{partner.nacionalidad?.name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Residencia</Table.Th>
                            <Table.Td>{partner.ciudadresidencia?.name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Socio o no</Table.Th>
                            <Table.Td>{partner.socioono?.name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Como nos conoció</Table.Th>
                            <Table.Td>{partner.howDidKnowUs?.name}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th>Año que nos conoció</Table.Th>
                            <Table.Td>{partner.yearDidKnowus?.name}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Card>
            {partner.observaciones && <Card>
                <Alert variant="light" color="blue" title="Observaciones">
                    {partner.observaciones}
                </Alert>
            </Card>}
            {partner.cosaspendientes && <Card>
                <Alert variant="light" color="blue" title="Cosas pendientes">
                    {partner.cosaspendientes}
                </Alert>
            </Card>}
        </div>
    )
}