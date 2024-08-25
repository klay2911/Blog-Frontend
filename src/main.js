import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import PrimeButton from 'primevue/button'
import PrimeDialog from 'primevue/dialog'
import PrimeCard from 'primevue/card'
import PrimeInputText from 'primevue/inputtext'
// import PrimeTextarea from 'primevue/textarea'
import PrimeToast from 'primevue/toast'
import Paginator from 'primevue/paginator'

import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
  ripple: true,
  locale: {
    first: 'First',
    last: 'Last',
    prev: 'Previous',
    next: 'Next',
    page: 'Page',
    rows: 'Rows'
  },
  theme: {
    preset: Aura
  }
})
app.component('PrimeButton', PrimeButton)
app.component('PrimeDialog', PrimeDialog)
app.component('PrimeCard', PrimeCard)
app.component('PrimeInputText', PrimeInputText)
// app.component('PrimeTextarea', PrimeTextarea)
app.component('PrimeToast', PrimeToast)
app.component('PrimePaginator', Paginator)

const primevueConfig = {
  inputStyle: 'filled',
  inputVariant: 'filled'
}
// app.config.globalProperties.$primevue = primevueConfig

app.use(createPinia())
app.use(router)

app.mount('#app')
