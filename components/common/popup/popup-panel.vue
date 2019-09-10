<template>
  <transition name="fade" >
    <div class="popup-container" ref="mainModal" v-show="visible">
      <div class="mask" v-show="visible" @touchmove.stop.prevent @click="hide"></div><!-- 遮罩 -->

      <transition :name="transitionMode">
        <div :class="panelClass" v-show="visible" @click="hide">
          <div class="content" v-if="contentComp">
            <component :class="compClass"
                       v-bind:is="contentComp"
                       :info="compData"
                       @hide="visible = false"></component>
          </div>
        </div>
      </transition><!-- 内容面板 -->
    </div>
  </transition>
</template>

<script type="text/babel">
export default {
  name: 'PopupPanel',
  data() {
    return {
      title: '',
      content: '',
      visible: false,
      contentComp: null,
      compData: null,
      scrollTop: 0,
      onDismiss: null,
      transitionMode: 'slide'
    }
  },
  methods: {
    hide: function() {
      this.onDismiss();
      this.visible = false;
      this.afterHide();
    },
    show: function() {
      this.beforeShow();
      this.visible = true;
    },
    afterHide: function() {
      document.body.style.position = 'static';
      document.body.style.overflow = '';
      window.scrollTo(0, this.scrollTop);
    },
    beforeShow: function() {
      this.scrollTop = document.documentElement.scrollTop || document.body.offsetTop || window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    }
  },
  computed: {
    panelClass: function() {
      let classMap = {
        'slide_down': 'top',
        'slide_left': 'right',
        'slide_right': 'left',
        'slide': 'bottom'
      }
      return ['panel', classMap[this.transitionMode]]
    },
    compClass: function() {
      let classMap = {
        'slide_down': 'top',
        'slide_left': 'right',
        'slide_right': 'left',
        'slide': 'bottom'
      }
      return classMap[this.transitionMode]
    }
  }
}
</script>

<style scoped>
  /* 淡入淡出 */
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  /* 向上划出 */
  .slide-enter-active,
  .slide-leave-active {
    transition: all .5s
  }

  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translateY(80%);
  }

  /* 向下划出 */
  .slide_down-enter-active,
  .slide_down-leave-active {
    transition: all .5s
  }

  .slide_down-enter,
  .slide_down-leave-to {
    opacity: 0;
    transform: translateY(-80%);
  }

  /* 向左划出 */
  .slide_left-enter-active,
  .slide_left-leave-active {
    transition: all .5s
  }

  .slide_left-enter,
  .slide_left-leave-to {
    opacity: 0;
    transform: translateX(80%);
  }

  /* 向右划出 */
  .slide_right-enter-active,
  .slide_right-leave-active {
    transition: all .5s
  }

  .slide_right-enter,
  .slide_right-leave-to {
    opacity: 0;
    transform: translateX(-80%);
  }

  .popup-container {
    position: fixed;
    width: 100%;
    max-width: 750px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 200;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 199;
  }

  .panel {
    position: fixed;
    overflow: scroll;
    z-index: 250;
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
  }
  .panel.top {top: 0;}
  .panel.left {left: 0;}
  .panel.right {right: 0;}
  .panel.bottom {bottom: 0;}

  .title {
    font-size: 36px;
    color: #030303;
    letter-spacing: 0;
    line-height: 36px;
    text-align: center;
    margin: 32px 0;
  }

  .content {
    flex: 1;
    overflow: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .content>div.top {position:absolute; top: 0;}
  .content>div.left {position:absolute; left: 0;}
  .content>div.right {position:absolute; right: 0;}
  .content>div.bottom {position:absolute; bottom: 0;}
</style>
