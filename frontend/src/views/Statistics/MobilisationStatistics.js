import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const MobilisationStatistics = () => {
  // Dummy data
  const numberOfWomenMobilised = 120;
  const numberOfConfirmations = 90;
  const numberOfParticipantsPresent = 85;
  const totalApplicants = 150;
  const selectedParticipants = 100;
  const droppedOut = 30;

  // Calculating percentages
  const selectionPercentage = (selectedParticipants / totalApplicants) * 100;
  const dropoutRate = (droppedOut / totalApplicants) * 100;

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre de femmes entrepreneures mobilisées" */}
      <CChart
        type="bar"
        data={{
          labels: ['Femmes mobilisées'],
          datasets: [
            {
              label: 'Nombre de femmes entrepreneures mobilisées',
              backgroundColor: '#FF6384',
              data: [numberOfWomenMobilised],
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

      {/* Chart for "Nombre de confirmations reçues" */}
      <CChart
        type="bar"
        data={{
          labels: ['Confirmations reçues'],
          datasets: [
            {
              label: 'Nombre de confirmations reçues',
              backgroundColor: '#36A2EB',
              data: [numberOfConfirmations],
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

      {/* Chart for "Nombre de participantes présentes" */}
      <CChart
        type="bar"
        data={{
          labels: ['Participantes présentes'],
          datasets: [
            {
              label: 'Nombre de participantes présentes',
              backgroundColor: '#FFCE56',
              data: [numberOfParticipantsPresent],
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

      {/* Chart for "Pourcentage de participantes retenues par rapport aux candidatures" */}
      <CChart
        type="doughnut"
        data={{
          labels: ['Participantes retenues', 'Autres'],
          datasets: [
            {
              backgroundColor: ['#36A2EB', '#FF6384'],
              data: [selectionPercentage, 100 - selectionPercentage],
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
          cutoutPercentage: 70, // Makes the circle smaller
          radius: '50%', // Adjusts the size
        }}
      />

      {/* Chart for "Taux des participantes qui arrêtent la formation avant la fin" */}
      <CChart
        type="doughnut"
        data={{
          labels: ['Participantes abandonnées', 'Autres'],
          datasets: [
            {
              backgroundColor: ['#FF6384', '#36A2EB'],
              data: [dropoutRate, 100 - dropoutRate],
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
          cutoutPercentage: 70, // Makes the circle smaller
          radius: '50%', // Adjusts the size
        }}
      />
    </div>
  );
};

export default MobilisationStatistics;
