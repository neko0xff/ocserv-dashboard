<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SystemApi, type SystemSetupSystem } from '@/api';
import { useI18n } from 'vue-i18n';
import { requiredRule } from '@/utils/rules';
import { useConfigStore } from '@/stores/config';
import { useProfileStore } from '@/stores/profile';
import { router } from '@/router';

defineProps({
    loading: Boolean
});

const emit = defineEmits(['setup']);

const { t } = useI18n();
const valid = ref(true);
const showPassword = ref(false);
const rules = {
    required: (v: string) => requiredRule(v, t)
};
const data = reactive<SystemSetupSystem>({
    google_captcha_secret_key: '',
    google_captcha_site_key: '',
    password: '',
    username: ''
});
</script>

<template>
    <v-form v-model="valid">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">{{ t('ADMIN_USERNAME') }}</v-label>
                <v-text-field
                    v-model="data.username"
                    :rules="[rules.required]"
                    color="primary"
                    hide-details
                    variant="outlined"
                />
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">{{ t('ADMIN_PASSWORD') }}</v-label>
                <v-text-field
                    v-model="data.password"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :rules="[rules.required]"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    color="primary"
                    hide-details
                    variant="outlined"
                    @click:append-inner="showPassword = !showPassword"
                />
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">
                    {{ t('GOOGLE_CAPTCHA_SITE_KEY') }}
                    <span class="text-subtitle-1">
                        <a
                            class="text-info mx-2"
                            href="https://www.google.com/recaptcha/admin/create"
                            style="text-decoration: none"
                        >
                            (recaptcha {{ t('HELP') }})
                        </a>
                    </span>
                </v-label>
                <v-text-field
                    v-model="data.google_captcha_site_key"
                    color="primary"
                    hide-details
                    type="text"
                    variant="outlined"
                />
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-bold mb-1">{{ t('GOOGLE_CAPTCHA_SECRET_KEY') }}</v-label>
                <v-text-field
                    v-model="data.google_captcha_secret_key"
                    color="primary"
                    hide-details
                    type="text"
                    variant="outlined"
                />
            </v-col>
            <v-col cols="12">
                <v-btn
                    :disabled="!valid"
                    :loading="loading"
                    block
                    color="primary"
                    flat
                    size="large"
                    @click="emit('setup', data)"
                >
                    {{ t('CREATE') }}
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>
