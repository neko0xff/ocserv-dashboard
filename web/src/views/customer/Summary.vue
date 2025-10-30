<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue';
import { useI18n } from 'vue-i18n';
import SummaryForm from '@/components/customer/SummaryForm.vue';
import {
    CustomerModelCustomerTrafficTypeEnum,
    CustomersApi,
    type CustomerSummaryData,
    type CustomerSummaryResponse
} from '@/api';
import { ref } from 'vue';
import SummaryResult from '@/components/customer/SummaryResult.vue';
import { router } from '@/router';

const { t } = useI18n();
const loading = ref(false);

const snapshot = ref<CustomerSummaryResponse>({
    ocserv_user: {
        deactivated_at: '',
        expire_at: '',
        is_locked: false,
        owner: '',
        rx: 0,
        traffic_size: 0,
        traffic_type: CustomerModelCustomerTrafficTypeEnum.FREE,
        tx: 0,
        username: ''
    },
    usage: {
        bandwidths: {
            rx: 0,
            tx: 0
        },
        date_start: '',
        date_end: ''
    }
});

const result = ref<CustomerSummaryResponse>(snapshot.value);

const hasResult = ref(false);

const getSummary = (data: CustomerSummaryData) => {
    loading.value = true;
    const api = new CustomersApi();
    api.customersSummaryPost({
        request: data
    })
        .then((res) => {
            result.value = res.data;
            hasResult.value = true;
        })
        .finally(() => {
            loading.value = false;
        });
};

const newSummary = () => {
    Object.assign(result.value, snapshot.value);
    hasResult.value = false;
};
</script>

<template>
    <div class="authentication">
        <v-container class="pa-3" fluid>
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col class="d-flex align-center" cols="12" lg="4" xl="3" v-if="!hasResult">
                    <v-card class="px-sm-1 px-0 mx-auto" elevation="10" max-width="500" rounded="md">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4">
                                <Logo />
                            </div>
                            <div class="text-body-1 text-muted text-center mb-5 text-capitalize">
                                {{ t('SUMMARY_GET_TEXT') }}
                            </div>
                            <SummaryForm @getSummary="getSummary" :loading="loading" />
                        </v-card-item>
                    </v-card>
                </v-col>

                <SummaryResult :result="result" v-if="hasResult" @newSummary="newSummary" />
            </v-row>
        </v-container>
    </div>
</template>
