<template>
    <div class="welcome">
        <div class="oper">
            <div>
                <wv-button type="primary" :plain="true" @click="go('login')">登陆</wv-button>
            </div>
            <div>
                <wv-button type="primary" :plain="true" @click="go('signup')">注册</wv-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
    },
    methods: {
        go: async function(route) {
            this.$router.push(`/${route}`)
        }
    }
}
</script>

<style lang="scss" scoped>
    .welcome {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background: {
            size: 100%;
            image: url(../static/image/welcome.jpeg);
            repeat: no-repeat;
        }

        .oper {
            position: absolute;
            bottom: 20%;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
        }
    }
</style>