import Vue from 'vue';
import Popup from './popup-panel.vue'

const PopupPanel = Vue.extend(Popup);
let instance;

export default {
  popup(options = {}) {
    if (!instance) {
      instance = new PopupPanel({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    instance.title = options.title || '';
    instance.content = options.content || '';
    instance.onDismiss = options.onDismiss;
    instance.contentComp = options.contentComp;
    instance.compData = options.compData;
    instance.fixedBody = options.fixedBody;
    document.body.appendChild(instance.$el);
    instance.visible = true;
    Vue.nextTick(() => {
      instance.show();
    });
  },

  init(options = {}) {
    if (!instance) {
      instance = new PopupPanel({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    instance.title = options.title || '';
    instance.content = options.content || '';
    instance.onDismiss = options.onDismiss;
    instance.contentComp = options.contentComp;
    instance.compData = options.compData;
    instance.fixedBody = options.fixedBody;
    instance.transitionMode = options.transitionMode;
    document.body.appendChild(instance.$el);
    instance.visible = true;
    Vue.nextTick(() => {
      instance.show();
    });
  },

  slideUp(options = {}) {
    options.transitionMode = 'slide';
    this.init(options)
  },

  slideDown(options = {}) {
    options.transitionMode = 'slide_down';
    this.init(options)
  },

  slideLeft(options = {}) {
    options.transitionMode = 'slide_left';
    this.init(options)
  },

  slideRight(options = {}) {
    options.transitionMode = 'slide_right';
    this.init(options)
  },

  close() {
    if (instance) {
      instance.hide();
    }
  }
}
