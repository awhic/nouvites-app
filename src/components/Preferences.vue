<template>
    <form class="preferences-form" @submit.prevent="onSubmit" autocomplete="off">
        <div class="form-group">
            <label for="region-select">Select a region:</label>
            <select id="region-select" v-model="form.selectedRegion">
                <option value="World">World</option>
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia/Pacific">Asia/Pacific</option>
            </select>
        </div>
        <div class="form-group" v-if="form.selectedRegion === 'North America'">
            <label for="country-select">Select country/countries:</label>
            <div class="checkbox-group">
                <input type="checkbox" id="us-checkbox" value="United States" v-model="form.selectedCountries">
                <label for="us-checkbox">United States</label>
                <input type="checkbox" id="canada-checkbox" value="Canada" v-model="form.selectedCountries">
                <label for="canada-checkbox">Canada</label>
            </div>
        </div>
        <button :disabled="!formIsValid" type="submit" class="submit-button">Submit</button>
    </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            form: {
                selectedRegion: 'World',
                selectedCountries: []
            }
        }
    },

    computed: {
        selectedRegionIsValid () {
            return !!this.form.selectedRegion;
        },

        selectedCountriesisValid () {
            return (this.form.selectedRegion !== 'North America' && !!this.form.selectedRegion) ||
                    (this.form.selectedRegion === 'North America' && this.form.selectedCountries.length > 0);
        },

        formIsValid () {
            return this.selectedRegionIsValid && this.selectedCountriesisValid;
        }
    },

    methods: {
        onSubmit() {
            if (this.formIsValid) {
                if (this.form.selectedRegion !== 'North America') {
                    this.form.selectedCountries = [];
                }
                console.log(this.form);
            } else {
                console.log('Form is Invalid');
            }
        }
    }
})
</script>
  
<style scoped>
.preferences-form {
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

.submit-button {
    background-color: #42b983;
    color: #fff;
}
</style>
  