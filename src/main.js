import Vue from 'vue';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import App from './App.vue'
import store from './vuex/store'

Vue.use(Mint);

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
