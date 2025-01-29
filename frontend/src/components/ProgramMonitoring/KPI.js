import React, { useEffect, useState } from 'react';

const KPI = () => {
    const [kpis, setKpis] = useState([]);

    useEffect(() => {
        const fetchKpis = async () => {
            try {
                const response = await fetch('/api/current-task/kpis');
                const data = await response.json();
                setKpis(data);
            } catch (error) {
                console.error('Error fetching KPIs:', error);
            }
        };

        fetchKpis();
    }, []);

    return (
        <div>
            <h1>KPIs</h1>
            <ul>
                {kpis.map((kpi, index) => (
                    <li key={index}>{kpi.name}: {kpi.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default KPI;