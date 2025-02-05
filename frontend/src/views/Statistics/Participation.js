import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const Participation = () => {
  // Dummy data
  const numberOfParticipantsContributing = 120;
  const interactionRate = 85;
  const satisfactionRate = 90;
  const averageSatisfactionScore = 4.5;
  const logisticSatisfactionRate = 95;

  // Calculating percentages
  const interactionRatePercentage = (interactionRate / 100) * 100;
  const satisfactionRatePercentage = (satisfactionRate / 100) * 100;
  const logisticSatisfactionRatePercentage = (logisticSatisfactionRate / 100) * 100;

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre de participantes qui contribuent aux discussions ou réalisent les tâches demandées" */}
      <CChart
        type="bar"
        data={{
          labels: ['Participantes contribuant'],
          datasets: [
            {
              label: 'Nombre de participantes qui contribuent aux discussions ou réalisent les tâches demandées',
              backgroundColor: '#FF6384',
              data: [numberOfParticipantsContributing],
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

      {/* Chart for "Taux d’interactions dans les activités" */}
      <CChart
        type="bar"
        data={{
          labels: ['Taux d\'interactions'],
          datasets: [
            {
              label: 'Taux d’interactions dans les activités',
              backgroundColor: '#36A2EB',
              data: [interactionRate],
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

      {/* Chart for "Taux de satisfaction des participants" */}
      <CChart
        type="bar"
        data={{
          labels: ['Taux de satisfaction'],
          datasets: [
            {
              label: 'Taux de satisfaction des participants',
              backgroundColor: '#FFCE56',
              data: [satisfactionRate],
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

      {/* Chart for "Moyenne des scores de satisfaction à la fin de la formation" */}
      <CChart
        type="bar"
        data={{
          labels: ['Moyenne des scores de satisfaction'],
          datasets: [
            {
              label: 'Moyenne des scores de satisfaction à la fin de la formation',
              backgroundColor: '#4BC0C0',
              data: [averageSatisfactionScore],
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

      {/* Chart for "Taux de satisfaction sur les aspects logistiques" */}
      <CChart
        type="bar"
        data={{
          labels: ['Satisfaction logistique'],
          datasets: [
            {
              label: 'Taux de satisfaction sur les aspects logistiques',
              backgroundColor: '#FF9F40',
              data: [logisticSatisfactionRate],
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

export default Participation;
