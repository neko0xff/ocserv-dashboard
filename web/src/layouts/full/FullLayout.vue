<script lang="ts" setup>
import { RouterView } from 'vue-router';
import MainView from './Main.vue';
import Snackbar from '@/components/shared/Snackbar.vue';
import Loading from '@/components/shared/Loading.vue';
</script>

<template>
    <v-locale-provider>
        <v-app>
            <MainView />
            <v-main>
                <v-container class="page-wrapper" fluid>
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
                <Snackbar />
                <Loading />
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
