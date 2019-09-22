<template>
    <div class="convs" @click="$emit('click')" v-hammer:press="onPress">
        <div class="convs-left">
            <div class="convs-left__img">
                <img src="~/static/image/avatar/default.jpg" alt="">
            </div>
        </div>
        <div class="convs-right">
            <div class="convs-right-top">
                <div class="convs-right-top__name">不是我吹</div><!--
                --><div class="convs-right-top__time">Yeaterday</div>
            </div>
            <div class="convs-right-btm">
                <div class="convs-right-btm__msg">爱笑的眼睛：大麦</div><!--
                --><div class="convs-right-btm__mute">Mute</div>
            </div>
        </div>


      <div class="convs-menu" v-show="showMenu">
        <ul class="convs-menu__ul">
          <li @click.stop="handleClick('stick')">Sticky on Top</li>
          <li @click.stop="handleClick('delete')">Delete Chat</li>
        </ul>
        <div class="convs-menu__mask" @click.stop="showMenu=false">
        </div>
      </div>

    </div>
</template>

<script>
export default {
    name: 'conversation',
    data() {
      return {
        showMenu: false
      }
    },
    props: {
      chat: {
        type: Object,
        default: {}
      }
    },
    methods: {
      onPress: function() {
        this.showMenu = true
      },
      handleClick: function(type) {
        switch (type) {
          case 'stick':
            this.$emit('on-stick', this.chat)
            break
          case 'delete':
            this.$emit('on-delete', this.chat)
            break
        }
        this.showMenu = false;
      }
    }
}
</script>

<style lang='scss' scoped>
.convs {
    display: flex;
    width: 100%;
    height: 70px;
    position: relative;
    &-left {
        width: 85px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &__img{
            width: 52px;
            height: 52px;
            border-radius: 3px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    &-right {
        flex: 1;
        box-sizing: border-box;
        height: 100%;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-top {
            width: 100%;
            height: 22px;

            &__name {
                display: inline-block;
                box-sizing: border-box;
                width: calc(100% - 90px);
                text-align: left;
                font-size: 16px;
                line-height: 20px;
                color: #000;
            }

            &__time {
                display: inline-block;
                box-sizing: border-box;
                width: 90px;
                text-align: right;
                font-size: 14px;
                line-height: 18px;
                vertical-align: top;
                color: #d6d6d6;
                padding-right: 18px;
            }
        }

        &-btm {
            width: 100%;
            height: 20px;
            &__msg {
                float: left;
                width: calc(100% - 90px);
                text-align: left;
                font-size: 13px;
                line-height: 20px;
                color: #8b8888;
            }

            &__mute {
                float: right;
                width: 90px;
                text-align: right;
                font-size: 13px;
                line-height: 18px;
                vertical-align: top;
                color: #d6d6d6;
                padding-right: 18px;
            }
        }
    }

    &-menu {
      position: absolute;
      top: 50%;
      right: 20px;
      z-index: 2;
      background: #fff;
      -moz-box-shadow: 0px 1px 6px -3px #808080;
      -webkit-box-shadow:0px 1px 6px -3px #808080;
      box-shadow:0px 1px 6px -3px #808080;

      &__ul {
        position: relative;
        z-index: 101;
        li {
          list-style: none;
          box-sizing: border-box;
          padding: 0 5px;
          min-width: 80px;
          height: 38px;
          text-align: center;
          border-top: 1px solid transparent;
          font-size: 16px;
          line-height: 38px;
          &:first-child {
            border-top: 1px solid transparent;
          }
          &:active{
            background: #f1f1f1;
          }
        }
      }

      &__mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        background: transparent;
        z-index: 100;

      }
    }
}
</style>
