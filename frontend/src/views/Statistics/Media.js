import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'

const Media = () => {
  // Dummy data
  const invitedMedia = 50;
  const presentMedia = 40;
  const articlesPublished = 25;
  const mediaReach = 100000; // Estimated audience

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre de médias invités" */}
      <CChart
        type="bar"
        data={{
          labels: ["Nombre de médias invités"],
          datasets: [
            {
              label: "Nombre de médias invités",
              backgroundColor: '#FF6384',
              data: [invitedMedia],
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

      {/* Chart for "Nombre de médias présents" */}
      <CChart
        type="bar"
        data={{
          labels: ["Nombre de médias présents"],
          datasets: [
            {
              label: "Nombre de médias présents",
              backgroundColor: '#36A2EB',
              data: [presentMedia],
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

      {/* Chart for "Nombre d'articles publiés / reportages réalisés après l'événement" */}
      <CChart
        type="bar"
        data={{
          labels: ["Articles publiés / Reportages réalisés"],
          datasets: [
            {
              label: "Nombre d'articles publiés / reportages réalisés",
              backgroundColor: '#FFCE56',
              data: [articlesPublished],
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

      {/* Chart for "Portée des publications médiatiques (audience estimée)" */}
      <CChart
        type="doughnut"
        data={{
          labels: ["Portée des publications médiatiques"],
          datasets: [
            {
              backgroundColor: ['#36A2EB'],
              data: [mediaReach],
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
        }}
      />
    </div>
  );
};

export default Media;
