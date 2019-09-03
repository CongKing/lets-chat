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
            <nuxt-link to="/login">去登陆</nuxt-link>
        </div>
    </dir>
</template>

<script>
import axios from 'axios'
import {signup} from '~/api/api'
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
            if(!this.validate()) return 
            Toast.loading({message: 'loading...', duration: 2000})
            let {err, data} = await signup({
                avatar: this.avatar,
                nickname: this.nickname,
                mobile: this.mobile,
                password: this.password
            })
            if(err) return
            Toast.success({message:'注册成功，去登陆吧', duration: 2000})
            setTimeout(() => this.$router.push('./login'), 2000)
        },
        validate: function() {

            // 昵称
            if(!this.nickname) {
                TopTips({message: '请输入昵称', duration: 3000})
                return
            }

            // 昵称
            if(/\s+/.test(this.nickname)) {
                TopTips({message: '请输入正确的昵称，不包括空格', duration: 3000})
                return
            }

            // 昵称
            if(!this.nickname) {
                TopTips({message: '请输入手机号', duration: 3000})
                return
            }
            
            // 手机号
            if(!/^1[3,4,5,6,7,8,9]{1}[0-9]{9}$/.test(this.mobile)) {
                TopTips({message: '手机号格式不正确', duration: 3000})
                return
            }
            
            // 密码
            if(!this.password) {
                TopTips({message: '请输入密码', duration: 3000})
                return
            }

            // 密码
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.password)) {
                TopTips({message: '密码须同时包含英文和字母', duration: 3000})
                return
            }

            // 密码
            if(!this.cPassword) {
                TopTips({message: '请再次输入密码', duration: 3000})
                return
            }

            // 二次密码
            if(this.cPassword !== this.password) {
                TopTips({message: '两次输入的密码不一致', duration: 3000})
                return
            }

            return true;
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