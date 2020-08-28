import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ( {data: { confirmed, recovered, deaths } , country} ) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length ? (
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: 'orange',
                        backgroundColor: 'rgba(255, 165, 0, 0.5)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'maroon',
                        backgroundColor: 'rgba(103, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );

    const barChart = (
        confirmed ?
        (<Bar 
            data= {{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(255, 255, 31, 0.5)',
                        'rgba(15, 209, 15, 0.5)',
                        'rgba(247, 4, 4, 0.5)',
                    ],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options= {{
                legend: { display: false},
                title: {display: true, text: `Current State in ${country}`}
            }}
        />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
};

export default Chart;