<template>
    <div class="v-chats">
        <conversation @click="chatWith"
                      @onSitck="stickChat"
                      @onDelete="deleteChat"/>
        <conversation/>
        <conversation/>
        <conversation/>
        <conversation/>
    </div>
</template>

<script>
import conversation from '~/components/chats/conversation/index.vue'
export default {
    components: {
        conversation
    },
    mounted: async function() {
      let [err, data] = await fetch('getChats')
      console.log(err, data)
    },
    methods: {
        chatWith: function() {
            this.$router.push('/conversation')
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
