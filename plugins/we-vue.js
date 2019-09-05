import Vue from 'vue'
import WeVue from 'we-vue'
import {Toast, TopTips} from 'we-vue'
import io from 'socket.io-client';

Vue.use(WeVue)
window.Toast = Toast
window.TopTips = TopTips
window.io = io

window.socket = io()

window.socket.on('connect', () => {
    console.log(socket.connected); // true

    window.socket.emit('message', 'heihei')
});
