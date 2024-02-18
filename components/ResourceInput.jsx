import { Select } from '@mantine/core'
import useFetch from 'use-http'

export default function ResourceInput({label, type, ...inputProps}) {
    const {data = []} = useFetch('/api/admin/resources/items?type=' + type, [])
    const dataInput = data.map((d) => ({
        value: d._id,
        label: d.name
    }))
    
    return (
        <Select searchable
            data={dataInput} label={label} {...inputProps} />
    )
}