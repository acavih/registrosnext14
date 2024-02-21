"use client"
import { Box, Button, Card, Flex, Grid, Group, NavLink, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import AddResourceForm from "./AddResourceForm";
import EditResourceForm from "./EditResourceForm";
import resourceStyles from './ResourceRow.module.css'

export default function ResourcesPage ({resourceTypes,resourceType,resources}) {
    return (
        <Box>
            <Stack>
                <Card>
                    <Card.Section>
                        <Box display={'flex'} style={{ justifyContent: 'space-between' }}>
                            <Title order={2}>Recursos para {resourceType}</Title>
                            <Group>
                                <AddResourceForm resourceType={resourceType} />
                            </Group>
                        </Box>
                    </Card.Section>
                </Card>
                <Grid>
                    <Grid.Col span={{base: 12, lg: 10}}>
                        <Title order={3}>Elementos</Title>
                        <Stack>
                            {resources.map(r => (
                                <Box key={r._id} className={resourceStyles.box} px={10} py={10}>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text>{r.name}</Text>
                                        <Group>
                                            <EditResourceForm resource={r} />
                                        </Group>
                                    </Flex>
                                </Box>
                            ))}
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{base: 12, lg: 2}}>
                        <Title order={3}>Tipos de recurso</Title>
                        <Stack style={{maxHeight: '80vh', overflow: 'auto'}}>
                            {resourceTypes.map(r => (
                                <NavLink active={resourceType === r} variant='filled' key={r} component={Link} href={'/admin/resources/' + r} label={r} />
                            ))}
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Box>
    )
}