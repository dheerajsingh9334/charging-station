import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store/auth'; 
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './style.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();
await authStore.checkAuth(); // ✅ wait for auth to complete before routing

app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true
});

app.mount('#app');
