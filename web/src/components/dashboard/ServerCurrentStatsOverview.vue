<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { HomeCurrentStats } from '@/api';

const { t } = useI18n();
defineProps<{
    currentStats: HomeCurrentStats;
}>();

const keyFormatter = (key: string) => {
    return key.replace(/_/g, ' ').trim();
};
</script>

<template>
    <v-card elevation="10">
        <v-card-title class="text-h5 pt-sm-2 ms-3 text-capitalize">{{ t('SERVER_CURRENT_STATS') }}</v-card-title>
        <v-card-item class="pa-6">
            <tbody>
                <tr v-for="(val, key, index) in currentStats" :key="`current-stats-${index}`">
                    <td class="px-10">
                        <p class="text-15 font-weight-bold text-capitalize">
                            {{ keyFormatter(key) }}
                        </p>
                    </td>
                    <td class="px-10">
                        <p class="text-15 font-weight-medium">{{ val }}</p>
                    </td>
                </tr>
            </tbody>
        </v-card-item>
    </v-card>
</template>
