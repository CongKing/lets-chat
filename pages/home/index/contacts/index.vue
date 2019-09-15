<template>
    <div class="v-contacts">
        <contact-item
        v-for="(item, index) of contacts"
        :contact="item"
        :key="['ctac', index].join('-')"
        @click="chatWith"/>
    </div>
</template>

<script>
import contactItem from '~/components/contacts/item/index.vue'
import {getContacts} from '~/api/api'
export default {
    components: {
        contactItem
    },
    data() {
        return {
            contacts: []
        }
    },
    mounted: async function() {
        Toast.loading({message: 'loading...', duration: 500})
        let {err, data} = await getContacts()
        if(err) return
        this.contacts = data.data
    },
    methods: {
        chatWith: function(contact) {
            this.$router.push('/conversation/' + contact._id || '')
        }
    }
}
</script>

<style lang="scss" scoped>
.v-contacts {
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
</style>
