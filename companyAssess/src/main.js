import { createApp} from "vue";
import {createPinia} from "pinia/dist/pinia";
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue";
import router from "./router";
import * as echarts from 'echarts'

const app = createApp(App);
const pinia = createPinia();
app.config.globalProperties.$echarts = echarts;
app.use(router);
app.use(pinia)
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
// app.use(ElementPlus)
app.mount("#app");
