import Vue from 'vue';
import Mint from 'mint-ui';
import Resource from 'vue-resource'
import 'mint-ui/lib/style.css';
import App from './App.vue'
import store from './store'


Vue.use(Mint)
Vue.use(Resource)

Vue.http.interceptors.push((request, next) => {
  var host = '//localhost:3000'
  request.params.token= 'test123456'
  console.log(request.url)
  request.url = host + request.url;
  // continue to next interceptor
  next();
});

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
