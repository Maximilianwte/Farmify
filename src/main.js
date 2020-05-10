import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTouch from 'vue-touch';
/* import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LControl,
  LPolygon,
  LPopup
} from 'vue2-leaflet';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-icon', LIcon);
Vue.component('l-polygon', LPolygon);
Vue.component('l-control', LControl);
Vue.component('l-popup', LPopup); */

import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader

Vue.use(VueLayers)

import VTooltip from "v-tooltip";
Vue.use(VTooltip);
Vue.config.productionTip = false;

Vue.use(VueTouch);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')