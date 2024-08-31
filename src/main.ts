import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Aura from '@primevue/themes/aura';
import Tooltip from 'primevue/tooltip';

import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'flatpickr/dist/flatpickr.min.css'
import "flowbite/dist/flowbite.min";
import 'primeicons/primeicons.css'
import 'vue-material-design-icons/styles.css';

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import { VueTelegramPlugin } from 'vue-tg'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(VueTelegramPlugin);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.directive('tooltip', Tooltip);

app.mount('#app')
