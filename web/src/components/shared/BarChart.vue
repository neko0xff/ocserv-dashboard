<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import type { ModelsDailyTraffic } from '@/api';

const props = defineProps<{
    data: ModelsDailyTraffic[];
}>();

const theme = useTheme();
const barOptions = computed(() => ({
    series: [
        {
            name: 'RX',
            data: props.data.map((d) => d.rx)
        },
        {
            name: 'TX',
            data: props.data.map((d) => d.tx)
        }
    ],
    chartOptions: {
        chart: {
            type: 'bar',
            height: 400,
            toolbar: { show: true },
            fontFamily: 'inherit'
        },
        colors: [theme.current.value.colors.primary, theme.current.value.colors.secondary],
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3
        },
        plotOptions: {
            bar: { horizontal: false, columnWidth: '40%', borderRadius: 8 }
        },
        xaxis: {
            type: 'category',
            categories: props.data.map((d) => d.date),
            labels: {
                style: { cssClass: 'grey--text lighten-2--text fill-color' }
            }
        },
        yaxis: {
            min: 0,
            labels: {
                style: { cssClass: 'grey--text lighten-2--text fill-color' }
            }
        },
        dataLabels: { enabled: false },
        tooltip: { theme: 'light' },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    plotOptions: { bar: { borderRadius: 3 } }
                }
            }
        ]
    }
}));
</script>
<template>
    <apexchart :options="barOptions.chartOptions" :series="barOptions.series" type="bar" />
</template>
