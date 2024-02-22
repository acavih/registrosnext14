"use client";
import { Group, Paper, Text, Title } from '@mantine/core';

export default function Stat({ stat }) {
    return (
        <Paper style={{cursor: 'pointer'}} withBorder p="md" radius="md" key={stat.title}>
            <Group justify="space-between">
                <Title order={2} style={{fontWeight: 'bold', color:'black'}} size="xs" c="dimmed">
                    {stat.title}
                </Title>
            </Group>

            <Group align="flex-end" gap="xs" mt={25}>
                <Text style={{fontWeight: 700, fontSize: '50px', lineHeight: 1}}>{stat.value}</Text>
            </Group>
        </Paper>
    );
}
