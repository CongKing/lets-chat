<template>
    <div class="msg-wrapper">
        <div class="msg__avatar">
          <img v-if="avatar" :src="avatar" alt="">
          <img v-else src="~/static/image/avatar/default.jpg" alt="">
        </div>
        <div class="content-wrapper">
            <div class="name">{{name || 'George'}}</div>
            <div class="content">
              {{content || 'Thanks for signing in to MDN with GitHub. To finish setting up your MDN Web Docs account, please choose a username and email address.'}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
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
        float: left;
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
        float: left;
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
            margin-left: 10px;
            background: #fff;
            border-radius: 5px;
            &::before {
                content: '';
                display: block;
                position: absolute;
                left: -7px;
                top: 15px;
                border: {
                    right: 7px solid #fff;
                    top: 5px solid transparent;
                    bottom: 5px solid transparent;
                }

            }
        }

    }
}

</style>
