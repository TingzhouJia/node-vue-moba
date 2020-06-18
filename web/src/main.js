import Vue from 'vue'
import App from './App.vue'
import './style.scss'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.component('m-card',Card)
Vue.component('m-list-card',ListCard)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
