import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'vue-material-design-icons/styles.css';

Vue.config.productionTip = false

var vm = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
