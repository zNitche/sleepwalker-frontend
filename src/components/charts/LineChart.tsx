import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { IChartDataset } from '../../interfaces/IChartDataset';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[]
  datasets: IChartDataset[]
  // stepSizeX?: number
  stepSizeY?: number
}

export function LineChart({ labels, datasets, stepSizeY }: LineChartProps) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        // type: "linear",
        ticks: {
          color: "#fff",
          autoSkip: true,
          // stepSize: stepSizeX ? stepSizeX : 1
        }
      },
      y: {
        ticks: {
          color: "#fff",
          stepSize: stepSizeY ? stepSizeY : 1,
          autoSkip: true
        }
      }
    },
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      }
    }
  }

  const data = { labels, datasets }

  return <Line options={options} data={data} />
}
