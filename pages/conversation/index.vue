<template>
    <div class="v-convs">
        <div class="v-convs-top">
            <div class="v-convs-top__arrow" @click="back"><arrow/></div>
            <div class="v-convs-top__name">不是我吹 <mute>(mute)</mute></div>
            <div class="v-convs-top__more">
                <img src="~/static/image/icon/conversation/more.png" alt="">
            </div>
        </div>

        <div ref="compBody" class="v-convs-body">
            <msg-getter />
            <msg-sender />
            <msg-getter />
            <msg-getter />
        </div>

        <div class="v-convs-bottom">
            <div class="v-convs-bottom-wrapper">
                <div class="bottom__mode">
                    <img v-show="false" src="~/static/image/icon/conversation/voice.png" alt="">
                    <img src="~/static/image/icon/conversation/keyboard.png" alt="">
                </div>
                <div class="bottom__msg">
                    <input type="text">
                </div>
                <div class="bottom__emoji">
                    <img src="~/static/image/icon/conversation/smile.png" alt="">
                </div>
                <div class="bottom__more">
                    <img v-show="false" src="~/static/image/icon/conversation/add.png" alt="">
                    <wv-button type="primary" :mini="true">发送</wv-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import arrow from '~/components/common/wedges/arrow/index.vue'
import MsgGetter from '~/components/chats/message/getter/index.vue'
import MsgSender from '~/components/chats/message/sender/index.vue'
export default {
    transition: 'fade',
    components: {
        arrow,
        MsgGetter,
        MsgSender
    },
    methods: {
        back: function() {
            window.history.back()
        },
        scrollToBottom: function() {
            let height = this.$refs.compBody.clientHeight;
            if(this.$refs.compBody.scrollTo) {
                this.$refs.compBody.scrollTo(0, height);
            } else {
                this.$refs.compBody.scrollTop = height;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~/static/css/common.scss';
.v-convs {
    width: 100%;
    height: 100vh;
    position: relative;

    &-top {
        @extend .border-abs-bottom;
        @include flex-c-c;
        width: 100%;
        height: 45px;
        position: absolute;
        top: 0;
        background: #f7f7fa;
        
        &__arrow {
            width: 12px;
            height: 12px;
            margin-left: 10px;
        }

        &__name {
            flex: 1;
            font-size: 13px;
            text-align: left;
            padding-left: 11px;
        }

        &__more {
            @include flex-rc-c;
            padding-right: 11px;
            height: 100%;
            img {
                width: 22px;
            }
        }
    }


    &-body {
        @include scroll-smooth;
        box-sizing: border-box;
        height: calc(100% - 45px - 53px);
        width: 100%;
        position: absolute;
        top: 45px;
        background: #f0f0f0;
    }


    &-bottom {
        @extend .border-abs-top;
        width: 100%;
        height: 53px;
        position: absolute;
        bottom: 0;
        background: #f7f7fa;

        &-wrapper {
            @include flex-c-c;
            height: 100%;

            .bottom__mode {
                @include flex-rc-c;
                width: 50px;
                
                img {
                    width: 30px;
                }
            }

            .bottom__msg {
                flex: 1;
                height: 40px;
                input {
                    width: 100%;
                    height: 100%;
                    font-size: 22px;
                    font-weight: 300;
                    border: none;
                    outline: none;
                }
            }

            .bottom__emoji {
                @include flex-rc-c;
                width: 50px;
                
                img {
                    width: 30px;
                }
            }

            .bottom__more {
                @include flex-rc-c;
                padding-right: 11px;
                
                img {
                    width: 30px;
                }
            }
        }
    }
}
</style>