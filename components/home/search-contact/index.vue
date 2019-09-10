<template>
  <div class="search-panel" @click.stop="click">
    <div class="search-panel-top">
      <div class="search-panel-top__arrow" @click="back"><arrow/></div>
      <div class="search-panel-top__input">
        <input v-model="value" placeholder="Search" type="text"/>
      </div>
      <div class="search-panel-top__close" v-show="value" @click="value = ''">
        <img src="~/static/image/icon/close-search.png">
      </div>
    </div>
  </div>
</template>

<script>
import arrow from '~/components/common/wedges/arrow/index.vue'
export default {
  name: 'index',
  components: {
    arrow
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    click: function() {
    },
    back: function() {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/static/css/common.scss';
  .search-panel {
    width: 100%;
    height: 100vh;
    background: #fff;

    .search-panel-top {
      position: relative;
      box-sizing: border-box;
      @extend .border-abs-bottom;
      @include flex-c-c;
      width: 100%;
      height: 53px;
      &__arrow {
        width: 12px;
        height: 12px;
        margin-left: 10px;
      }

      &__input {
        margin-left: 10px;
        flex: 1;
        input{
          width: 100%;
          height: 100%;
          font-size: 18px;
          font-weight: 300;
          border: none;
          outline: none;
          &::-webkit-input-placeholder { /* WebKit browsers */
            color: #bfbfbf;
            font-size: 16px;
          }
        }
      }

      &__close {
        width: 18px;
        height: 18px;
        margin: 0 15px;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
