    import React, { useEffect, useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { loadEntrepreneurs } from '../../app/features/entrepreneursData/entrepreneursSlice'; // adjust the path
    import { CChart } from '@coreui/react-chartjs';
    import { getStyle } from '@coreui/utils';
    import './EntrepeneurStat.css';

    const EntrepreneursStatistics = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadEntrepreneurs());
    }, [dispatch]);

    const entrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs);

    // Calculate number of female and male co-founders
    const numberOfFemaleCoFounders = entrepreneurs.filter(
        (entrepreneur) => entrepreneur.gender === 'femme',
    ).length;
    const numberOfMaleCoFounders = entrepreneurs.length - numberOfFemaleCoFounders;

    // Calculate percentage values
    const totalCoFounders = numberOfFemaleCoFounders + numberOfMaleCoFounders;
    const femalePercentage = (numberOfFemaleCoFounders / totalCoFounders) * 100;
    const malePercentage = (numberOfMaleCoFounders / totalCoFounders) * 100;

    // Render the label with both percentage and number
    const femaleLabel = `Female: ${femalePercentage.toFixed(2)}% (${numberOfFemaleCoFounders})`;
    const maleLabel = `Male: ${malePercentage.toFixed(2)}% (${numberOfMaleCoFounders})`;

  
 
  // Calculate number of entrepreneurs per region
  const entrepreneursPerRegion = {};
  entrepreneurs.forEach((entrepreneur) => {
    const region = entrepreneur.region;
    entrepreneursPerRegion[region] = (entrepreneursPerRegion[region] || 0) + 1;
  });

  // Sort regions by number of entrepreneurs
  const sortedRegions = Object.keys(entrepreneursPerRegion).sort(
    (a, b) => entrepreneursPerRegion[b] - entrepreneursPerRegion[a],
  );

  // Convert object to arrays for chart data
  const regionLabels = Object.keys(entrepreneursPerRegion);
  const regionData = Object.values(entrepreneursPerRegion);


    // Function to calculate age from date of birth
    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }
        return age;
    }

    // Calculate total age
    const totalAge = entrepreneurs.reduce(
        (acc, entrepreneur) => acc + calculateAge(entrepreneur.dateDeNaissance),
        0,
    );

    // Calculate average age
    const averageAge = totalAge / entrepreneurs.length;

    // Calculate number of entrepreneurs per sector of activity
    const entrepreneursPerSector = {};
    entrepreneurs.forEach((entrepreneur) => {
        const sector = entrepreneur.secteurActivites;
        entrepreneursPerSector[sector] = (entrepreneursPerSector[sector] || 0) + 1;
    });

    // Sort sectors by number of entrepreneurs
    const sortedSectors = Object.keys(entrepreneursPerSector).sort(
        (a, b) => entrepreneursPerSector[b] - entrepreneursPerSector[a],
    );

   

    // Function to calculate age from date of birth
    function calculateAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }
        return age;
    }

    
    // Convert object to arrays for chart data
    const sectorLabels = Object.keys(entrepreneursPerSector);
    const sectorData = Object.values(entrepreneursPerSector);
    
    // Create age groups and count entrepreneurs in each group
    const ageGroups = {
        '0-20': 0,
        '21-30': 0,
        '31-40': 0,
        '41-50': 0,
        '51-60': 0,
        '61+': 0,
    };

    entrepreneurs.forEach((entrepreneur) => {
        const age = calculateAge(entrepreneur.dateDeNaissance);
        if (age <= 20) {
        ageGroups['0-20']++;
        } else if (age <= 30) {
        ageGroups['21-30']++;
        } else if (age <= 40) {
        ageGroups['31-40']++;
        } else if (age <= 50) {
        ageGroups['41-50']++;
        } else if (age <= 60) {
        ageGroups['51-60']++;
        } else {
        ageGroups['61+']++;
        }
    });

    // Convert age groups object to arrays for chart data
    const ageLabels = Object.keys(ageGroups);
    const ageData = Object.values(ageGroups);

    return (
        <div className="chart-gallery">
            <CChart
            type="bar"
            data={{
            labels: sectorLabels,
            datasets: [
                {
                label: 'Number of Entrepreneurs',
                backgroundColor: '#36A2EB',
                data: sectorData,
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
        <CChart
            type="bar"
            data={{
            labels: ageLabels,
            datasets: [
                {
                label: 'Number of Entrepreneurs',
                backgroundColor: '#36A2EB',
                data: ageData,
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
        <CChart
            type="bar"
            data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                label: 'GitHub Commits',
                backgroundColor: '#f87979',
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                },
            ],
            }}
            labels="months"
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
        <CChart
            type="doughnut"
            data={{
            labels: [femaleLabel, maleLabel], // Use the labels with both percentage and number
            datasets: [
                {
                backgroundColor: ['#FF6384', '#36A2EB'],
                data: [femalePercentage, malePercentage],
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
        <CChart
      type="bar"
      data={{
        labels: regionLabels,
        datasets: [
          {
            label: 'Number of Startups by Region',
            backgroundColor: '#FFCE56',
            data: regionData,
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

    export default EntrepreneursStatistics;
