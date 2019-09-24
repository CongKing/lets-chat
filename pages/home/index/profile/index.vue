<template>
   <div class="v-profile">
       <div class="v-profile__input">
           <div>
               <FileInput ref="fileComp" v-model="fileData" :preImg="avatar"/>
           </div>
           <wv-group title="" v-show="!onEdit">
               <wv-cell title="昵称" :value="nickname" is-link></wv-cell>
               <wv-cell title="手机号" :value="mobile" ></wv-cell>
             <wv-cell title="密码" value="*******" is-link></wv-cell>
           </wv-group>
       </div>
   </div>
</template>

<script>
import FileInput from '~/components/file-input/file-input.vue'
import {mapState, mapMutations} from 'vuex'
export default {
  components: {
      FileInput
  },
  data() {
    return {
      onEdit: false,
      fileData: {}
    }
  },
  mounted: function() {
  },
  methods: {
    ...mapMutations([
      'setAvatar'
    ])
  },
  computed: {
    ...mapState([
      'avatar', 'nickname', 'mobile'
    ])
  },
  watch: {
    fileData: async function(val) {
      if(!val.data) return
      try {
        await await Dialog({title: '更换头像', message: '确定更换头像吗？', showCancelButton: true, skin: 'ios'})
        let [err, data] = await fetch('uploadFile', {
          name: val.name,
          data: val.data
        })
        let user = await fetch('changeProfile', {
          avatar: data.filePath
        })
        Toast.success('操作成功')
        this.setAvatar(user.avatar)
      } catch(e) {
        this.$refs.fileComp.remove()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-profile {
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    padding: 0 15px;
    overflow: hidden;

    &__input {
        margin: {
            top: 150px;
            bottom: 40px;
        }
    }

    &__signup {
        margin-top: 5px;
        a {
            display: block;
            text-align: center;
        }
    }

}
</style>
