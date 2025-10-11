<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { HomeGeneralInfo } from '@/api';

const { t } = useI18n();
defineProps<{
    generalInfo: HomeGeneralInfo;
}>();

const keyFormatter = (key: string) => {
    return key.replace(/_/g, ' ').trim();
};
</script>

<template>
    <v-card elevation="10" height="595px">
        <v-card-title class="text-h5 pt-sm-2 ms-3 text-capitalize">{{ t('SERVER_GENERAL_INFO_OVERVIEW') }}</v-card-title>
        <v-card-item class="pa-6">
            <tbody>
                <tr v-for="(val, key, index) in generalInfo" :key="`current-stats-${index}`">
                    <td class="px-10">
                        <p class="text-15 font-weight-bold text-capitalize">
                            {{ keyFormatter(key) }}
                        </p>
                    </td>
                    <td class="px-10">
                        <p v-if="key == 'Status'" class="text-15 font-weight-medium">
                            <span
                                :class="val === 'online' ? 'text-primary' : 'text-error'"
                                class="text-capitalize font-weight-bold text-h5"
                                >{{ val }}</span
                            >
                            <v-icon v-if="val === 'online'" color="primary" end>mdi-check</v-icon>
                            <v-icon v-else color="error" end>mdi-alert-circle</v-icon>
                        </p>
                        <p v-else class="text-15 font-weight-medium">
                            {{ val }}
                        </p>
                    </td>
                </tr>
            </tbody>
        </v-card-item>
    </v-card>
</template>
