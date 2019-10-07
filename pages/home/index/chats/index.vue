<template>
    <div class="v-chats">
        <conversation v-for="(chat, index) of chatList"
                      @click="chatWith"
                      @onSitck="stickChat"
                      @onDelete="deleteChat"
                      :chat="chat"
                      :key="['chat', index].join('-')"/>
        <!--<conversation/>-->
        <!--<conversation/>-->
        <!--<conversation/>-->
        <!--<conversation/>-->
    </div>
</template>

<script>
import conversation from '~/components/chats/conversation/index.vue'
export default {
    components: {
        conversation
    },
    data() {
      return {
        chatList: []
      }
    },
    mounted: async function() {
      let [err, data] = await fetch('getChats')
      if(err) {
        return console.log(err)
      }
      this.chatList = data
    },
    methods: {
        chatWith: function(chat) {
          console.log(chat)
          if(chat._id) this.$router.push('/conversation/' + chat.to._id)
        },
        stickChat: function(chat) {
          // TODO 置顶 / 取消置顶
        },
        deleteChat: function(chat) {
            // TODO 删除聊天
        }
    }
}
</script>

<style lang="scss" scoped>

.v-chats {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}

</style>
