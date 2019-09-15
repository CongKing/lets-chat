<template>
    <dir class="v-login">
        <div class="v-login__input">
            <wv-input label="手机号" placeholder="请输入手机号" v-model="mobile"></wv-input>
            <wv-input label="密码" placeholder="请输入密码" type="password" v-model="password"></wv-input>
        </div>
        <div class="v-login__button" @click="login">
            <wv-button type="primary">登陆</wv-button>
        </div>

        <div class="v-login__signup">
            <nuxt-link to="/signup">去注册</nuxt-link>
        </div>
    </dir>
</template>

<script>
import {login} from '~/api/api'
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            mobile: '',
            password: ''
        }
    },
    methods: {
        login: async function() {
            if(!this.validate()) return;

            Toast.loading({message: 'loading...', duration: 1000})

            // Session 登陆
            let {err, data} = await login({mobile: this.mobile, password: this.password})
            if (err) return

            // Socket 登陆
            [err, data] = await fetch('login', {mobile: this.mobile, password: this.password})
            if (err) return

            window.localStorage.setItem('token', data.token)
            // TODO 存用户信息

            Toast.success({message:'登陆成功', duration: 1000})

            setTimeout(() => this.$router.push('/home'), 1000)
        },
        validate: function() {
            if(!/^1[3,4,5,6,7,8,9]{1}[0-9]{9}$/.test(this.mobile)) {
                TopTips({message: '手机号格式不正确', duration: 3000})
                return
            }

            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.password)) {
                TopTips({message: '密码不正确', duration: 3000})
                return
            }
            return true
        }
    }
}
</script>

<style lang='scss' scoped>
.v-login {
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
