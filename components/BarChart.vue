<template>
    <div class="container">
        <Bar v-if="loaded" :data="chartData" :options="chartOptions"/>

        <div v-if="loaded">
            {{ keys }}
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
    name: 'BarChart',
    components: { Bar },
    data() {
        return {
            loaded: false,
            apiData: undefined,
        }
    },
    async mounted() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch('http://127.0.0.1:8000/api/hello/', options)
            .then(response => response.json())
            .then(response => {
                this.apiData = response
                console.log(response)
            })
            .catch(err => console.error(err));

        console.log('mounted')
        this.loaded = true
    },
    computed: {
        chartLabels() {
            return this.apiData === undefined ? null : this.apiData.data["Nano 33 BLE Sense_0"].map(x => x.timestamp.$date)
        },
        chartApiData() {
            return this.apiData === undefined ? null : this.apiData.data["Nano 33 BLE Sense_0"].map(x => x.data.temperature)
        },
        keys() {
            return this.apiData === undefined ? null : Object.keys(this.apiData.data)
        },
        chartData() {
            return {
                labels: this.chartLabels,
                responsive: true,
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: this.chartApiData
                    }
                ]
            }
        },
    }
}
</script>
