<template>
    <div class="msg-wrapper">
        <div class="msg__avatar">
            <img src="~/static/image/avatar/default.jpg" alt="">
        </div>
        <div class="content-wrapper">
            <div class="content">
                Thanks for signing in to MDN with GitHub. To finish setting up your MDN Web Docs account, please choose a username and email address.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '~/static/css/common.scss';
.msg-wrapper {
    box-sizing: border-box;
    padding: 0 10px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    &:first-child {
        margin-top: 10px;
    }

    .msg__avatar {
        float: right;
        box-sizing: border-box;
        width: 45px;
        height: 45px;
        border-radius: 5px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }

    .content-wrapper {
        position: relative;
        float: right;
        box-sizing: border-box;
        max-width: 70%;
        min-height: 45px;

        .name {
            text-align: left;
            font-size: 12px;
            padding-left: 10px;
            color: #b7b7b7;
        }
        .content {
            position: relative;
            max-width: 100%;
            min-height: 45px;
            font-size: 13px;
            padding: 10px 8px;
            margin-right: 10px;
            background: #58e657;
            border-radius: 5px;
            &::before {
                content: '';
                display: block;
                position: absolute;
                right: -7px;
                top: 15px;
                border: {
                    left: 7px solid #58e657;
                    top: 5px solid transparent;
                    bottom: 5px solid transparent;
                }
                
            }
        }
        
    }
}

</style>