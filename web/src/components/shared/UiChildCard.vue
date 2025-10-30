<script lang="ts" setup>
defineProps({
    title: String,
    divider: Boolean,
    titleColor: String
});
</script>

<template>
    <v-card elevation="10">
        <v-card-item v-if="title || $slots['title-header']" :class="`bg-${titleColor}`" class="py-3">
            <v-card-title class="text-h5 text-capitalize">
                {{ title }}
            </v-card-title>
            <slot name="title-header" />
        </v-card-item>
        <v-divider v-if="divider" />
        <v-card-text>
            <slot />
        </v-card-text>
        <v-card-actions>
            <slot name="action" />
        </v-card-actions>
    </v-card>
</template>
