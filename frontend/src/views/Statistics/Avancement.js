import React, { useEffect, useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import './Stat.css'
const Avancement = () => {
  // Dummy data
  const numberOfProjectIdeas = 150;
  const numberOfProjectsInStartupPhase = 90;
  const numberOfProjectsInDevelopmentPhase = 60;
  const numberOfParticipantsRefiningIdeas = 100;

  // Calculating percentages
  const startupPhasePercentage = (numberOfProjectsInStartupPhase / numberOfProjectIdeas) * 100;
  const developmentPhasePercentage = (numberOfProjectsInDevelopmentPhase / numberOfProjectIdeas) * 100;

  return (
    <div className="chart-gallery">
      {/* Chart for "Nombre d'idées de projets" */}
      <CChart
        type="bar"
        data={{
          labels: ['Idées de projets'],
          datasets: [
            {
              label: 'Nombre d\'idées de projets',
              backgroundColor: '#FF6384',
              data: [numberOfProjectIdeas],
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

      {/* Chart for "Nombre de projets en phase de démarrage" */}
      <CChart
        type="bar"
        data={{
          labels: ['Projets en phase de démarrage'],
          datasets: [
            {
              label: 'Nombre de projets en phase de démarrage',
              backgroundColor: '#36A2EB',
              data: [numberOfProjectsInStartupPhase],
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

      {/* Chart for "Nombre de projets en phase de développement" */}
      <CChart
        type="bar"
        data={{
          labels: ['Projets en phase de développement'],
          datasets: [
            {
              label: 'Nombre de projets en phase de développement',
              backgroundColor: '#FFCE56',
              data: [numberOfProjectsInDevelopmentPhase],
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

      {/* Chart for "Nombre de participantes ayant affiné ou clarifié leurs idées/projets grâce à la formation" */}
      <CChart
        type="bar"
        data={{
          labels: ['Participantes ayant affiné leurs idées'],
          datasets: [
            {
              label: 'Nombre de participantes ayant affiné ou clarifié leurs idées/projets grâce à la formation',
              backgroundColor: '#4BC0C0',
              data: [numberOfParticipantsRefiningIdeas],
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

      {/* Chart for "Pourcentage de projets en phase de démarrage" */}
      <CChart
        type="doughnut"
        data={{
          labels: ['Projets en phase de démarrage', 'Autres'],
          datasets: [
            {
              backgroundColor: ['#36A2EB', '#FF6384'],
              data: [startupPhasePercentage, 100 - startupPhasePercentage],
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

      {/* Chart for "Pourcentage de projets en phase de développement" */}
      <CChart
        type="doughnut"
        data={{
          labels: ['Projets en phase de développement', 'Autres'],
          datasets: [
            {
              backgroundColor: ['#FFCE56', '#36A2EB'],
              data: [developmentPhasePercentage, 100 - developmentPhasePercentage],
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

export default Avancement;
