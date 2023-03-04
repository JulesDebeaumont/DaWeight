<script setup lang="ts">
import { readEntries } from 'src/utils/fileManager'
import { IEntry } from 'src/components/models'
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { formatTimeStampToDate } from 'src/utils/util'
// chartjs
import { Bar, Line } from 'vue-chartjs'
import {
    Chart as ChartJS, Title, Tooltip, PointElement, BarElement, CategoryScale, LinearScale, LineElement, Legend
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

// consts
const $q = useQuasar()
const chartOptions = {
    responsive: true
}

// refs
const isLoading = ref(false)
const chartData = ref<{ labels: string[], datasets: { data: number[], backgroundColor: string, label: string, borderColor: string }[] }>({
    labels: [],
    datasets: [{ data: [], backgroundColor: '#73f5d0', label: 'Poids en kg', borderColor: '#32ade6' }]
})

// functions
async function getEntries() {
    isLoading.value = true
    try {
        const entries = await readEntries()
        entries?.forEach((entry: IEntry) => {
            chartData.value.labels.push(formatTimeStampToDate(entry.createdAt))
            chartData.value.datasets[0].data.push(entry.weight / 10)
        })
    } catch (error) {
        console.error(error)
        $q.notify({
            type: 'negative',
            message: 'Une erreur est survenue'
        })
    } finally {
        isLoading.value = false
    }
}

// lifeCycle
onMounted(async () => {
    getEntries()
})
</script>

<template>
    <q-page class="column">
        <div class="row justify-between q-pa-sm">
            <q-btn icon="list" round :to="{ name: 'home' }" color="info" />
            <q-btn icon="add" round :to="{ name: 'newEntry' }" color="info" />
        </div>
        <div v-if="chartData.labels.length > 0" class="flex column q-pa-sm q-gutter-lg">
            <Bar id="bars" :options="chartOptions" :data="chartData" />
            <Line id="lines" :options="chartOptions" :data="chartData" />
        </div>
    </q-page>
</template>
