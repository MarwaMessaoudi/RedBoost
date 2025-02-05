import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const ProfileParticipant = () => {
  // Dummy data
  const numberOfWomen = 120;
  const numberOfMen = 100;
  const averageAge = 30;

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre de femmes" */}
      <CChart
        type="bar"
        data={{
          labels: ['Nombre de femmes'],
          datasets: [
            {
              label: 'Nombre de femmes',
              backgroundColor: '#FF6384',
              data: [numberOfWomen],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />

      {/* Chart for "Nombre d'hommes" */}
      <CChart
        type="bar"
        data={{
          labels: ['Nombre d\'hommes'],
          datasets: [
            {
              label: 'Nombre d\'hommes',
              backgroundColor: '#36A2EB',
              data: [numberOfMen],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />

      {/* Chart for "Moyenne d'âge des participants" */}
      <CChart
        type="bar"
        data={{
          labels: ['Moyenne d\'âge'],
          datasets: [
            {
              label: 'Moyenne d\'âge des participants',
              backgroundColor: '#FFCE56',
              data: [averageAge],
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ProfileParticipant;
