<template>
    <div class="convs">
        <div class="convs-left">
            <div class="convs-left__img">
                <img src="~/static/image/avatar/default.jpg" alt="">
            </div>
        </div>
        <div class="convs-right">
            <div class="convs-right-top">
                <div class="convs-right-top__name">不是我吹</div><!--
                --><div class="convs-right-top__time">Yeaterday</div>
            </div>
            <div class="convs-right-btm">
                <div class="convs-right-btm__msg">爱笑的眼睛：大麦</div><!--
                --><div class="convs-right-btm__mute">Mute</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'conversation'
}
</script>

<style lang='scss' scoped>
.convs {
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
        &-top {
            width: 100%;
            height: 22px;

            &__name {
                display: inline-block;
                box-sizing: border-box;
                width: calc(100% - 90px);
                text-align: left;
                font-size: 16px;
                line-height: 20px;
                color: #000;
            }

            &__time {
                display: inline-block;
                box-sizing: border-box;
                width: 90px;
                text-align: right;
                font-size: 14px;
                line-height: 18px;
                vertical-align: top;
                color: #d6d6d6;
                padding-right: 18px;
            }
        }

        &-btm {
            width: 100%;
            height: 20px;
            &__msg {
                float: left;
                width: calc(100% - 90px);
                text-align: left;
                font-size: 13px;
                line-height: 20px;
                color: #8b8888;
            }

            &__mute {
                float: right;
                width: 90px;
                text-align: right;
                font-size: 13px;
                line-height: 18px;
                vertical-align: top;
                color: #d6d6d6;
                padding-right: 18px;
            }
        }
    }
}
</style>