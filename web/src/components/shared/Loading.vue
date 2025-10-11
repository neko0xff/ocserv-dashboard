<script lang="ts" setup>
import { useLoadingStore } from '@/stores/loading';
import logoUrl from '@/assets/images/logo-circule.png';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const loader = useLoadingStore();
</script>

<template>
    <v-overlay v-model="loader.isLoading" class="d-flex align-center justify-center" persistent>
        <div class="loader">
            <img :src="logoUrl" alt="Logo" class="logo" />
            <p class="loading-text">{{ t('REQUESTING') }}...</p>
        </div>
    </v-overlay>
</template>

<style scoped>
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.logo {
    width: 150px;
    animation: pulse 1s infinite ease-in-out;
}

.loading-text {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 1px;
    animation: pulse 1s infinite;
}

/* Pulse animation for logo */
@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}

/* Blinking text animation */
@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
