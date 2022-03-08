import { createApp } from "vue";
import 'bootstrap';
import axios from "axios";
import VueAxios from "vue-axios";
// import mitt from "mitt";
import VueLoading from "vue-loading-overlay";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(VueLoading);
app.use(router);
app.mount("#app");
