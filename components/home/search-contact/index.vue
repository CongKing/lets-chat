<template>
  <div class="search-panel" @click.stop="click">
    <div class="search-panel-top">
      <div class="search-panel-top__arrow" @click="back"><arrow/></div>
      <div class="search-panel-top__input">
        <input v-model="value" placeholder="Search" type="text" @keydown="search"/>
      </div>
      <div class="search-panel-top__close" v-show="value" @click="value = ''">
        <img src="~/static/image/icon/close-search.png">
      </div>
    </div>

    <div class="search-panel-result">
      <div class="search-tip" v-show="!users.length">
        Mobile or Nickname
      </div>
      <div class="search-result" v-show="users.length">
        <wv-group title="联系人">
          <contact-item v-for="(item, index) of users"
                        :contact="item"
                        noBorder
                        :key="['user', index].join('-')" @click="preAdd"></contact-item>
        </wv-group>
      </div>
    </div>
  </div>
</template>

<script>
import arrow from '~/components/common/wedges/arrow/index.vue'
import ContactItem from '~/components/contacts/item/index.vue'
export default {
  name: 'index',
  components: {
    arrow,
    ContactItem
  },
  data() {
    return {
      users: [],
      value: ''
    }
  },
  methods: {
    click: function() {
    },
    back: function() {
      this.$emit('hide')
    },
    search: async function($event) {
      if($event.keyCode !==13 ) return;
      let [err, data] = await fetch('findUsers', {value: this.value})
      if(err) {
        Toast.text({message: err, duration: 1500})
        return
      }
      this.users = data.users
    },
    preAdd: function(contact) {
      Dialog.confirm({
        title: '添加好友',
        message: '向 [ ' + contact.nickname + ' ] 发送好友请求',
        skin: 'ios',
        showCancelButton: true
      }).then(async () => {
        await await fetch('addFriendRequest', {userId: contact._id});
        Toast.text({message: '发送成功', duration: 1000})
      }).catch(() => {
        // 取消
      })
    },
    addFriendById: async function(userId) {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~/static/css/common.scss';
  .search-panel {
    width: 100%;
    height: calc(100vh - 53px);
    background: linear-gradient(to bottom, #fff, #f6f6f6);
    &-top {
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

    &-result {
      .search-tip {
        @include flex-rc-c;
        width: 100%;
        height: 60px;
        font-size: 15px;
        color: #d7d7d7;
        font-weight: 100;
      }

      .search-result {
        width: 100%;
        overflow: hidden;

        /deep/.weui-cells {
          background: none;
        }
      }
    }
  }
</style>
