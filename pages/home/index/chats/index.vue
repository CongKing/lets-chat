<template>
    <div class="v-chats">
        <conversation @click="chatWith"/>
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
    methods: {
        chatWith: function() {
            this.$router.push('/conversation')
        }
    }
}
</script>

<style lang="scss" scoped>

.v-chats {
    widows: 100%;
    height: 100%;
    background: #f8f8f8;
}

</style>