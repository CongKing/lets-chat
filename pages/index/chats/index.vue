<template>
    <div>
        <conversation/>
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
    }
}
</script>

<style lang="sass" scoped>
.cell-icon 
    width: 50px
    display: block
</style>