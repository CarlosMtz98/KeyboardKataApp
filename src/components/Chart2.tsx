import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

/*
  Labels puede ser el número de sesión
  y en data el arreglo de velocidad de cada uno.
*/

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
};


const labels = ['1', '2', '3', '4', '5', '6', '7'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Velocidad',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


function App() {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}


export default App;
