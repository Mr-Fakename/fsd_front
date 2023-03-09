<template>
    <div class="chart">
        <Line v-if="loaded" :data="chartData" :options="chartOptions" :style="chartStyles"/>
    </div>
</template>

<script>
import { Line } from 'vue-chartjs'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    LineController,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement, LineController)

export default {
    name: 'LineChart',
    components: { Line },
    data() {
        return {
            loaded: false,
            apiData: undefined,

            chartOptions: {
                indexAxis: 'x',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins : {
                    legend: {
                        labels : {
                            color: 'white',
                            font: {
                                size: 14,
                            }
                        }
                    },
                }
            }
        }
    },
    async mounted() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch('http://127.0.0.1:8000/api/mongo/', options)
            .then(response => response.json())
            .then(response => {
                this.apiData = response
            })
            .catch(err => console.error(err));

        this.loaded = true
    },
    computed: {
        chartLabels() {
            return this.apiData === undefined ? null : this.apiData.data["Nano 33 BLE Sense_0"].map(x => new Date(x.timestamp.$date).toLocaleString())
        },
        chartTemperature() {
            return this.apiData === undefined ?
                null :
                this.apiData.data["Nano 33 BLE Sense_0"].map(
                    x => x.data.temperature
                )
        },
        chartHumidity() {
            return this.apiData === undefined ? null : this.apiData.data["Nano 33 BLE Sense_0"].map(x => x.data.humidity)
        },
        keys() {
            return this.apiData === undefined ? null : Object.keys(this.apiData.data)
        },
        chartStyles() {
            return {
                height: '70vh',
                width: '100%',
            }
        },
        chartData() {
            return {
                labels: this.chartLabels,
                responsive: true,
                datasets: [
                    {
                        label: 'Temperature',
                        data: this.chartTemperature,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: false,
                        pointRadius: 0,
                    },
                    {
                        label: 'Humidity',
                        data: this.chartHumidity,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false,
                        pointRadius: 0,
                    },
                ]
            }
        },
    }
}
</script>

<style scoped lang="scss">
.chart {
    padding-top: 5vh;
}
</style>