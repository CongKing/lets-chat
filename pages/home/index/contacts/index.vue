<template>
    <div class="v-contacts">
      <wv-tabs >
        <wv-tab title="Contacts">
          <contact-item v-for="(item, index) of contacts"
                        :contact="item"
                        :key="['ctac', index].join('-')"
                        @click="chatWith"/>
        </wv-tab>
        <wv-tab title="New Friends">
          <contact-item v-for="(item, index) of requests"
                        :contact="item"
                        :key="['ctac', index].join('-')"
                        @click="handleRequest"/>
        </wv-tab>
      </wv-tabs>

      <wv-actionsheet
        type="ios"
        :title="currentRequest.username + '的好友请求'"
        :actions="requestActions"
        cancel-text="取消"
        v-model="requestSheetVisible"/>
    </div>
</template>

<script>
import contactItem from '~/components/contacts/item/index.vue'
import {getContacts} from '~/api/api'
import { mapMutations } from 'vuex'
export default {
    components: {
        contactItem
    },
    data() {
        return {
            contacts: [],
            request: {},
            requests: [],
            currentRequest: {},
            requestSheetVisible: false,
            requestActions: [
              {
                name: '拒绝',
                method: async () => {
                  await fetch('handleRequest', {
                    from: this.currentRequest.from,
                    to: this.currentRequest.to,
                    status: 'reject'
                  })
                }
              },
              {
                name: '同意',
                method: async () => {
                  await fetch('handleRequest', {
                    from: this.currentRequest.from,
                    to: this.currentRequest.to,
                    status: 'accept'
                  })
                }
              }
            ]
        }
    },
    mounted: async function() {
        Toast.loading({message: 'loading...', duration: 500})

        let [_Coterr, _cotData] = await fetch('getContacts')
        console.log(_cotData)
        if(_Coterr) return
        this.contacts = _cotData.data

        let [_reqErr, _reqData] = await fetch('getRequests')
        if(_reqErr) return
        this.requests = _reqData

        // let {err, data} = await getContacts()
        // if(err) return
        // this.contacts = data.data
    },
    methods: {
        ...mapMutations(['addFriends', 'addRequests']),
        chatWith: function(contact) {
            // TODO vuex 加入一个 chatList 中加入一个chat
            this.$router.push('/conversation/' + contact._id || '')
        },
        handleRequest: function(request) {
          this.requestSheetVisible = true
          this.currentRequest = request
        }
    }
}
</script>

<style lang="scss" scoped>
.v-contacts {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  overflow: scroll;
}
</style>
