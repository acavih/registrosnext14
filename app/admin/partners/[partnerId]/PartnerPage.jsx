"use client"
import EditPartnerForm from './EditPartnerForm'
import RemovePartner from './RemovePartner'
import { Alert, Box, Card, Table, Text, Group, Chip } from "@mantine/core";
import dayjs from 'dayjs'
import AddPartnerAttentionForm from './attentions/AddPartnerAttentionForm'
import UpdatePartnerAttentionForm from './attentions/UpdatePartnerAttentionForm'
import RemoveAttention from './attentions/RemoveAttention'

export default function PartnerPage({ partner, attentions }) {
    return (
        <div>
            <Card>
                <Card.Section>
                    <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
                        <Text size="xl">{partner.nombre} {partner.apellidos}</Text>
                        <Group>
                            <EditPartnerForm partner={partner} />
                            <RemovePartner partner={partner} />
                        </Group>
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
            {typeof partner.observaciones === 'string' && <Card>
                <Alert variant="light" color="blue" title="Observaciones">
                    {partner.observaciones}
                </Alert>
            </Card>}
            {typeof partner.cosaspendientes === 'string' && <Card>
                <Alert variant="light" color="blue" title="Cosas pendientes">
                    {partner.cosaspendientes}
                </Alert>
            </Card>}
            <Card>
                <Box display={'flex'} style={{justifyContent: 'space-between'}}>
                    <Text size='xl'>Listado de atenciones</Text>
                    <AddPartnerAttentionForm partner={partner} />
                </Box>
                {attentions.map(a => (
                    <Box key={a._id} style={{border: '1px solid'}} my={10}>
                        <Box p="5" px={10} bg="black" display={'flex'} style={{justifyContent: 'space-between'}}>
                            <Text color='white'>{dayjs(a.fechaatencion).format('DD/MM/YYYY')}</Text>
                            <Group>
                                <UpdatePartnerAttentionForm partner={partner} attention={a} />
                                <RemoveAttention partner={partner} attention={a} />
                            </Group>
                        </Box>
                        <hr style={{margin: '0px'}} />
                        <Box p="10">
                            <Text>{a.comentario}</Text>
                            {a.lugaratencion?.name && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Lugar de atención</Text>
                                    <Chip>{a.lugaratencion?.name}</Chip>
                                </>
                            )}
                            {a.tipoaenciones.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Tipos de atenciones</Text>
                                    <Group>
                                        {a.tipoaenciones.map((at) => <Chip key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                    
                                </>
                            )}
                            {a.derivadoa.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Derivado a</Text>
                                    <Group>
                                        {a.derivadoa.map((at) => <Chip key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                    
                                </>
                            )}
                            {a.derivadode.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Derivado de</Text>
                                    <Group>
                                        {a.derivadode.map((at) => <Chip key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                </>
                            )}
                            {a.motivosatencion.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Motivos de atencion</Text>
                                    <Group>
                                        {a.motivosatencion.map((at) => <Chip key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                </>
                            )}
                            {a.formacion.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Formacion</Text>
                                    <Group>
                                        {a.formacion.map((at) => <Chip key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                </>
                            )}
                            {a.voluntariado.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Voluntariado</Text>
                                    <Group>
                                        {a.voluntariado.map((at) => <Chip key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                </>
                            )}
                            {a.Proyectos.length > 0 && (
                                <>
                                    <Text style={{fontWeight: 'bold'}}>Proyectos</Text>
                                    <Group>
                                        {a.Proyectos.map((at) => <Chip readOnly key={at._id}>{at.name}</Chip>)}
                                    </Group>
                                </>
                            )}
                        </Box>
                    </Box>
                ))}
            </Card>
        </div>
    )
}