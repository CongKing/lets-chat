import Vue from 'vue'
import WeVue from 'we-vue'
import {Toast, TopTips} from 'we-vue'
import {socket, fetch} from './socket-api/socket'

Vue.use(WeVue)
window.Toast = Toast
window.TopTips = TopTips
window.socket = socket
window.fetch = fetch
