import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { IChartDataset } from '../../interfaces/IChartDataset'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartProps {
  labels: string[]
  datasets: IChartDataset[]
}

export function BarChart({ labels, datasets }: BarChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#fff"
        }
      },
      y: {
        ticks: {
          color: "#fff",
          stepSize: 1
        }
      }
    },
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      },
      // customCanvasBackgroundColor: {
      //   color: "#fff",
      // }
    }
  }

  const data = { labels, datasets }

  return <Bar options={options} data={data} />
}
