<template>
   <div>
     <!-- 顶部导航 -->
     <div class="search-bar" @click="popupSearch">
       <search-bar></search-bar>
     </div>

     <!-- 内容 -->
     <div class="child-view">
      <NuxtChild/>
     </div>

     <!-- 底部导航 -->
     <wv-tabbar>
      <wv-tabbar-item to="/home/chats" :isOn="activeTab === 'chats'" @click="switchTab('chats')">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img v-if="activeTab !== 'chats'" class="weui-tabbar__icon" src="/image/icon/chat.png" slot="icon">
          <img v-if="activeTab === 'chats'" class="weui-tabbar__icon" src="~/static/image/icon/chat-act.png" slot="icon">
          <wv-badge style="position: absolute;top: -2px;right: -13px;">8</wv-badge>
        </span>
        Chats
      </wv-tabbar-item>

      <wv-tabbar-item to="/home/contacts" :isOn="activeTab === 'contacts'" @click="switchTab('contacts')">
        <img v-if="activeTab !== 'contacts'" class="weui-tabbar__icon" src="~/static/image/icon/contacts.png" slot="icon">
        <img v-if="activeTab === 'contacts'" class="weui-tabbar__icon" src="~/static/image/icon/contacts-act.png" slot="icon">
        Contacts
      </wv-tabbar-item>

      <wv-tabbar-item to="/home/discover" :isOn="activeTab === 'discover'" @click="switchTab('discover')">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img v-if="activeTab !== 'discover'" class="weui-tabbar__icon" src="~/static/image/icon/discovery.png" slot="icon">
          <img v-if="activeTab === 'discover'" class="weui-tabbar__icon" src="~/static/image/icon/discovery-act.png" slot="icon">
          <wv-badge is-dot style="position: absolute;top: 0;right: -6px;">8</wv-badge>
        </span>
        Discover
      </wv-tabbar-item>

      <wv-tabbar-item to="/home/profile" :isOn="activeTab === 'profile'" @click="switchTab('profile')">
        <img v-if="activeTab !== 'profile'" class="weui-tabbar__icon" src="~/static/image/icon/profile.png" slot="icon">
        <img v-if="activeTab === 'profile'" class="weui-tabbar__icon" src="~/static/image/icon/profile-act.png" slot="icon">
        Me
      </wv-tabbar-item>
    </wv-tabbar>
   </div>
</template>

<script>
import SearchBar from '~/components/home/search-bar/index.vue'
import PopupPanel from '~/components/common/popup/index.js'
import SearchContact from '~/components/home/search-contact/index.vue'

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      activeTab: 'profile'
    }
  },
  methods: {
    switchTab: function(tab) {
      this.activeTab = tab
    },
    popupSearch: function() {
      // PopupPanel.slideUp({
      //   contentComp: SearchContact,
      //   onDismiss: () => { console.log('关闭') }
      // })
      PopupPanel.slideDown({
        contentComp: SearchContact,
        onDismiss: () => { console.log('关闭') }
      })
      // PopupPanel.slideLeft({
      //   contentComp: SearchContact,
      //   onDismiss: () => { console.log('关闭') }
      // })
      // PopupPanel.slideRight({
      //   contentComp: SearchContact,
      //   onDismiss: () => { console.log('关闭') }
      // })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~/static/css/common.scss';
.search-bar {
  display: flex;
  height: 53px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f4f4f4;
  @extend .border-abs-bottom;
}
.child-view {
  position: absolute;
  box-sizing: border-box;
  height: calc(100vh - 53px - 53px);
  top: 53px;
  left: 0;
  right: 0;
}
</style>
