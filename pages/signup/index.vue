<template>
    <dir class="v-signup">
        <div class="v-signup__input">
            <wv-input label="昵称" placeholder="请输入昵称" v-model="nickname"></wv-input>
            <wv-input label="手机号" placeholder="请输入手机号" v-model="mobile"></wv-input>
            <wv-input label="密码" placeholder="请输入密码" type="password" v-model="password"></wv-input>
            <wv-input label=" " placeholder="请再次输入密码" type="password" v-model="cPassword"></wv-input>
        </div>
        <div class="v-signup__button" @click="signup">
            <wv-button type="primary">注册</wv-button>
        </div>

        <div class="v-signup__signup">
            <nuxt-link to="/signup">去登陆</nuxt-link>
        </div>
    </dir>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            avatar: '',
            nickname: '',
            mobile: '',
            password: '',
            cPassword: ''
        }
    },
    methods: {
        signup: async function() {
            let resp = await axios.post('/user/signup', {
                avatar: this.avatar,
                nickname: this.nickname,
                mobile: this.mobile,
                password: this.password
            })
            console.log(resp)
        }
    }
}
</script>

<style lang='scss' scoped>
.v-signup {
    width: 100%;
    height: 100vh;
    background-color: #f3f3f3;
    padding: 0 15px;
    overflow: hidden;

    &__input {
        margin: {
            top: 150px;
            bottom: 40px;
        } 
    }

    &__ button {

    }

    &__signup {
        margin-top: 5px;
        a {
            display: block;
            text-align: center;
        }
    }

    .weui-cell:before {
        border-top: 1px solid #11cc21;
        color: #1ec674;
    }

    .weui-cell:last-child::after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #11cc21;
        color: #1ec674;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        left: 15px;
        z-index: 2;
    }
    
}
</style>