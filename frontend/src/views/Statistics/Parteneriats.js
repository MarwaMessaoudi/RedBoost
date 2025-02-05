import React from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const Parteneriats = () => {
  // Dummy data
  const ecosystemGuests = 200;
  const presentStructures = 50;
  const ecosystemPresenceRate = 75; // Percentage
  const ngoRepresentatives = 30;
  const stateSectorRepresentatives = 40;
  const privateSectorRepresentatives = 60;

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre d'invités de l'écosystème" */}
      <CChart
        type="bar"
        data={{
          labels: ["Nombre d'invités de l'écosystème"],
          datasets: [
            {
              label: "Nombre d'invités de l'écosystème",
              backgroundColor: '#FF6384',
              data: [ecosystemGuests],
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

      {/* Chart for "Nombre de structures présentes" */}
      <CChart
        type="bar"
        data={{
          labels: ['Nombre de structures présentes'],
          datasets: [
            {
              label: 'Nombre de structures présentes',
              backgroundColor: '#36A2EB',
              data: [presentStructures],
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

      {/* Chart for "Taux de présence écosystème" */}
      <CChart
        type="doughnut"
        data={{
          labels: ['Présents', 'Absents'],
          datasets: [
            {
              backgroundColor: ['#36A2EB', '#FF6384'],
              data: [ecosystemPresenceRate, 100 - ecosystemPresenceRate],
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
          cutoutPercentage: 70,
        }}
      />

      {/* Chart for "Nombre de représentants d'ONG présents" */}
      <CChart
        type="bar"
        data={{
          labels: ["Nombre de représentants d'ONG présents"],
          datasets: [
            {
              label: "Nombre de représentants d'ONG présents",
              backgroundColor: '#FFCE56',
              data: [ngoRepresentatives],
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

      {/* Chart for "Nombre de représentants du secteur étatique présents" */}
      <CChart
        type="bar"
        data={{
          labels: ['Nombre de représentants du secteur étatique présents'],
          datasets: [
            {
              label: 'Nombre de représentants du secteur étatique présents',
              backgroundColor: '#4BC0C0',
              data: [stateSectorRepresentatives],
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

      {/* Chart for "Nombre de représentants du secteur privé présents" */}
      <CChart
        type="bar"
        data={{
          labels: ['Nombre de représentants du secteur privé présents'],
          datasets: [
            {
              label: 'Nombre de représentants du secteur privé présents',
              backgroundColor: '#9966FF',
              data: [privateSectorRepresentatives],
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

export default Parteneriats;
