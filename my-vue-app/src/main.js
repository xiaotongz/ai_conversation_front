import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/global.css'
import '@/assets/manager.css'
import { createPinia } from 'pinia';

// import axios from 'axios'
// //
// 配置请求的跟路径
// axios.defaults.baseURL = 'http://127.0.0.1:9099/'
// Vue.prototype.$http = axios
//zuuf
//fjfj

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
const pinia = createPinia(); // 创建 Pinia 实例
app.use(pinia); // 注册 Pinia

app.mount('#app');
