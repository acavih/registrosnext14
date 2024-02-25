import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({dataRaw, title, datasetName}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    
    const labels = dataRaw.map(e => e.key)

    const data = {
        labels,
        datasets: [
            {
                label: datasetName,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                data: dataRaw.map(e => e.value)
            }
        ]
    }

    return (
        <Bar options={options} data={data} />
    )
}
