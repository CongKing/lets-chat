<template>
   <div>
     <div class="child-view">
      <NuxtChild/>
    </div>
     <wv-tabbar>
      <wv-tabbar-item to="/home/chats" :isOn="activeTab === 'chats'" @click="switchTab('chats')">
        <span slot="icon" style="display: inline-block; position: relative;">
          <img v-if="activeTab !== 'chats'" class="weui-tabbar__icon" src="~/static/image/icon/chat.png" slot="icon">
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
import Logo from '~/components/Logo.vue'


export default {
  components: {
    Logo
  },
  data() {
    return {
      activeTab: 'profile'
    }
  },
  methods: {
    switchTab: function(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style lang='scss' scoped>
.child-view {
  position: absolute;
  box-sizing: border-box;
  height: calc(100vh - 53px);
  top: 0;
  left: 0;
  right: 0;
}
</style>
