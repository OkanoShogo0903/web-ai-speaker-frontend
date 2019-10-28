import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-material-design-icons/styles.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Vue.component('font-awesome-icon', FontAwesomeIcon)
// library.add(faCoffee)

Vue.config.productionTip = false
Vue.use(VueSidebarMenu)

Vue.prototype.$event_bus = new Vue(); // Global event bus
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
