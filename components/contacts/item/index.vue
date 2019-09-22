<template>
    <div class="ctats" @click="$emit('click', contact)">
        <div class="ctats-left">
            <div class="ctats-left__img">
                <img v-show="!contact.avatar" src="~/static/image/avatar/default.jpg" alt="">
                <img v-show="contact.avatar" :src="contact.avatar" alt="">
            </div>
        </div>
        <div :class="{'ctats-right': true, 'no-border': noBorder}">
            {{contact.nickname || contact.username}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'ctats-item',
    props: {
        contact: {
            type: Object,
            default: () => {}
        },
        noBorder: {
          type: Boolean,
          default: false
        }
    }
}
</script>

<style lang='scss' scoped>


.ctats {
    display: flex;
    width: 100%;
    height: 70px;

    &-left {
        width: 85px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &__img{
            width: 52px;
            height: 52px;
            border-radius: 3px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    &-right {
        flex: 1;
        box-sizing: border-box;
        height: 100%;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        flex-direction: column;
        justify-content: center;
      &.no-border{
        border: none;
      }
    }
}
</style>
