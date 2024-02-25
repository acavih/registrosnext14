"use client"
import _ from 'lodash'
import BarChart from './BarChart';
import { Button, Flex, Grid, Group, Tabs, Title } from '@mantine/core';
import { DateTimeInput } from '@/components/DateTimeInput';
import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';

const currentYear = new Date().getFullYear()

const df = currentYear + '-01-01'
const dt = currentYear + '-12-31'

export default function StatsPage ({}) {
    const [dateFrom, setDateFrom] = useState(new Date(df))
    const [dateTo, setDateTo] = useState(new Date(dt))

    const {data: {attentions}} = trpc.getAttentionsData.useQuery({
        df: dateFrom.toISOString(),
        dt: dateTo.toISOString(),
    }, {
        initialData: {
            attentions: []
        }
    })

    // const [attentions, setAttentions] = useState(attentionsRaw)


    const {socios, chartsPartner, chartsAttentions} = useStatsData(attentions)

    return (
        <div>
            <Flex justify={'space-between'} align={'center'}>
                <Title order={3}>Estadísticas</Title>
                <Group>
                    <Button>Socios: {socios.length}</Button>
                    <Button>Atenciones: {attentions.length}</Button>
                </Group>
            </Flex>
            <Grid>
                <Grid.Col span={{lg: 3}}>
                    <DateTimeInput value={dateFrom} onChange={setDateFrom} label="Fecha desde" />
                </Grid.Col>
                <Grid.Col span={{lg: 3}}>
                    <DateTimeInput value={dateTo} onChange={setDateTo} label="Fecha hasta" />
                </Grid.Col>
            </Grid>
            <Tabs defaultValue={'Socios'}>
                <Tabs.List>
                    <Tabs.Tab value='Socios'>Socios</Tabs.Tab>
                    <Tabs.Tab value='Atenciones'>Atenciones</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='Socios'>
                    <Grid>
                        {chartsPartner.map(({Component, ...params}) => (
                            <Grid.Col key={params.title} span={6}>
                                <Component {...params} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Tabs.Panel>
                <Tabs.Panel value='Atenciones'>
                    <Grid>
                        {chartsAttentions.map(({Component, ...params}) => (
                            <Grid.Col key={params.title} span={6}>
                                <Component {...params} />
                            </Grid.Col>
                        ))}
                    </Grid>
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

function useStatsData (attentions) {
    const socios = _.uniqBy(attentions.map(a => a.user), '_id')
    const [
        groupedBySex, groupedSocioono, groupedNacionalidad,
        groupedResidencia, groupedRyearDidKnowus, groupedhowDidKnowUs
    ] = ['sexo', 'socioono', 'nacionalidad',
        'ciudadresidencia', 'yearDidKnowus', 'howDidKnowUs'].map(a => _.groupBy(socios, a + '.name'))

    const chartsPartner = [
        {Component: BarChart, dataRaw: convertToArray(groupedBySex), title: 'Socios por sexo', datasetName: 'Sexo'},
        {Component: BarChart, dataRaw: convertToArray(groupedSocioono), title: 'Socios por socio o no', datasetName: 'Socio o no'},
        {Component: BarChart, dataRaw: convertToArray(groupedNacionalidad), title: 'Socios por nacionalidad', datasetName: 'Nacionalidad'},
        {Component: BarChart, dataRaw: convertToArray(groupedResidencia), title: 'Socios por residencia', datasetName: 'Residencia'},
        {Component: BarChart, dataRaw: convertToArray(groupedRyearDidKnowus), title: 'Socios por año que nos conocio', datasetName: 'Año que nos conoció'},
        {Component: BarChart, dataRaw: convertToArray(groupedhowDidKnowUs), title: 'Socios por como nos conocio', datasetName: 'Como nos conoció'},
    ]

    const [
        groupedProyectos, groupedtipoaenciones, groupedmotivosatencion, groupedderivadoa,
        groupedderivadode, groupedformacion, groupedvoluntariado
    ] = [
        'Proyectos', 'tipoaenciones', 'motivosatencion', 'derivadoa',
        'derivadode', 'formacion', 'voluntariado'
    ].map(
        (e) => extractStat(attentions, e)
    )

    const [groupedLugaratencion] = ['lugaratencion'].map(a => _.groupBy(attentions, a + '.name'))

    const chartsAttentions = [
        {Component: BarChart, dataRaw: convertToArray(groupedProyectos), title: 'Socios por proyecto', datasetName: 'Proyectos'},
        {Component: BarChart, dataRaw: convertToArray(groupedtipoaenciones), title: 'Socios por tipo de atención', datasetName: 'Tipo de atención'},
        {Component: BarChart, dataRaw: convertToArray(groupedmotivosatencion), title: 'Socios por motivos de atencion', datasetName: 'Motivos de atención'},
        {Component: BarChart, dataRaw: convertToArray(groupedderivadoa), title: 'Socios por derivado a', datasetName: 'Derivado a'},
        {Component: BarChart, dataRaw: convertToArray(groupedderivadode), title: 'Socios por derivado de', datasetName: 'Derivado de'},
        {Component: BarChart, dataRaw: convertToArray(groupedformacion), title: 'Socios por formación', datasetName: 'Formación'},
        {Component: BarChart, dataRaw: convertToArray(groupedvoluntariado), title: 'Socios por voluntariado', datasetName: 'Voluntariado'},
        {Component: BarChart, dataRaw: convertToArray(groupedLugaratencion), title: 'Socios por lugar de atención', datasetName: 'Lugar de atención'},
    ]

    return {
        socios, chartsPartner, chartsAttentions
    }

    function extractStat (attentions, stat) {
        const stats = {}

        attentions.forEach(element => {
            const keyArray = element[stat]
            keyArray.forEach(rItem => {
                if (!stats[rItem.name]) stats[rItem.name] = []
                stats[rItem.name].push(element)
            });
        });

        return stats
    }

    function convertToArray(obj) {
        const elems: any[] = []
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                elems.push({key, value: element.length})
            }
        }
        return elems
    }
}