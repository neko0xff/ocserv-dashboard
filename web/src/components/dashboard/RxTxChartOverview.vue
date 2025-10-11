<script lang="ts" setup>
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { useI18n } from 'vue-i18n';
import type { ModelsDailyTraffic } from '@/api';

const theme = useTheme();
const { t } = useI18n();
const props = defineProps<{
    data: ModelsDailyTraffic[];
}>();
const chartOptions = computed(() => ({
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
    <v-card elevation="10" height="567px">
        <v-card-item>
            <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                <div>
                    <v-card-title class="text-h5 text-capitalize">RX / TX {{ t('TEN_DAYS_OVERVIEW') }}</v-card-title>
                </div>
            </div>

            <div v-if="data.length > 0" class="mt-6">
                <apexchart :options="chartOptions.chartOptions" :series="chartOptions.series" type="bar" />
            </div>

            <div v-else class="mt-6 text-capitalize">{{ t('NO_10_DAYS_BANDWIDTHS_OVERVIEW_FOUND') }}!</div>
        </v-card-item>
    </v-card>
</template>
