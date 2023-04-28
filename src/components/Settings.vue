<template>
    <form class="settings-form" @submit.prevent="onSubmit" autocomplete="off">
        <h2>Settings</h2>
        <div class="form-group">
            <label for="country-select">Select a country:</label>
            <select id="country-select" v-model="form.selectedCountry">
                <option v-for="(country, countryCode) in englishSpeakingCountryCodes" :key="countryCode" :value="country">
                    {{ country }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="api-key-input">API Key:</label>
            <input type="text" id="api-key-input" v-model="form.apiKey" />
            <p v-if="!apiKeyIsValid" class="error-message">API Key is required.</p>
        </div>
        <button :disabled="!formIsValid" type="submit">Save</button>
    </form>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, SetupContext, Ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

export default defineComponent({
    setup(props, { emit }: SetupContext) {
        const store = useStore();
        const toast = useToast();

        const englishSpeakingCountryCodes: Ref<{ [key: string]: string }> = ref({
            AU: 'Australia',
            CA: 'Canada',
            GB: 'United Kingdom',
            IE: 'Ireland',
            IN: 'India',
            NZ: 'New Zealand',
            PH: 'Philippines',
            SG: 'Singapore',
            US: 'United States',
            ZA: 'South Africa',
        });

        const form = ref({
            selectedRegion: 'World',
            selectedCountry: englishSpeakingCountryCodes.value[store.getters.getSelectedCountryCode],
            apiKey: store.getters.getApiKey,
        });
        const selectedRegionIsValid = computed(() => {
            return !!form.value.selectedRegion;
        });

        const selectedCountryIsValid = computed(() => {
            return form.value.selectedRegion !== 'North America' || !!form.value.selectedCountry;
        });

        const apiKeyIsValid = computed(() => {
            return !!form.value.apiKey;
        });

        const formIsValid = computed(() => {
            return selectedRegionIsValid.value && selectedCountryIsValid.value && apiKeyIsValid.value;
        });

        const onSubmit = () => {
            if (formIsValid.value) {
                const countryKey = Object.entries(englishSpeakingCountryCodes.value).find(
                    ([key, value]) => value === form.value.selectedCountry
                )?.[0];
                store.dispatch('updateSelectedCountryCode', countryKey);
                store.dispatch('updateApiKey', form.value.apiKey);
                toast.success('Settings saved!');
            } else {
                toast.error('Error saving settings');
            }
        };

        return {
            form,
            englishSpeakingCountryCodes,
            selectedRegionIsValid,
            selectedCountryIsValid,
            apiKeyIsValid,
            formIsValid,
            onSubmit,
        };
    },
});
</script>
  
<style scoped>
.settings-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.checkbox-group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
}

.error-message {
    color: red;
    font-size: 0.8rem;
    margin: 0;
}
</style>
  