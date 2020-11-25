import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Web3 from 'web3';

Vue.config.productionTip = false

Vue.prototype.$web3 = Vue.web3 = new Web3('http://127.0.0.1:8545');

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
