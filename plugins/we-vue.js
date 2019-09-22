import Vue from 'vue'
import WeVue from 'we-vue'
import {Toast, TopTips, Dialog} from 'we-vue'
import {socket, fetch} from './socket-api/socket'
import {VueHammer} from 'vue2-hammer'

Vue.use(WeVue)
Vue.use(VueHammer)
window.Toast = Toast
window.TopTips = TopTips
window.Dialog = Dialog
window.socket = socket
window.fetch = fetch
