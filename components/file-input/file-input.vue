<template>
  <div class="file-input" >
    <input id="rdInput"
           multiple="multiple"
           @change="onFileChange"
           :value="innerVal"
           ref="inputer"
           type="file"/>
    <label for="rdInput" v-show="!preview && !preImg" :style="{'backgroundImage': 'url(' + bgImg + ')'}"></label>
    <label for="rdInput" class="file-input__preview" v-show="preview || preImg">
      <div class="file-input__preview-remove"></div>
      <img :src="preview || preImg" />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'FileInput',
    data () {
      return {
        file: {},
        preview: '',
        innerVal: '',
        bgImg: require('~/static/image/icon/camera.png')
      }
    },
    props: {
      fileMaxSize: {
        type: Number,
        default: (1024 * 10 * 1024)
      },
      preImg: {
        type: String,
        default: ''
      },
      maxUpload: {
        type: Number,
        default: 1
      },
      accept: {
        type: String,
        default: ''
      },
      value: {
        type: Object,
        default: () => []
      }
    },
    methods: {
      remove: function() {
        this.file = {}
        this.preview = ''
      },
      onFileChange: async function(event) {
        let file = event.target.files[0];
        this.innerVal = '';
        if (['jpeg', 'png', 'gif', 'jpg', 'pdf'].indexOf(file.type.split('/')[1]) < 0) {
          this.$emit('error', '请上传图片文件或者pdf文件');
          return;
        }
        if (file.size > this.fileMaxSize) {
          this.$emit('error', '文件不能超过10M');
          return;
        }

        this.handleSingleFile(file);
      },
      handleSingleFile: async function(file) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          const formData = this.transformFileToFormData(file);
          let data = await this.transformToDataUrl(file);
          Object.assign(this.file, {
            name: file.name,
            data,
            formData,
            progress: 0,
            url: ''
          })
          this.preview = data
          this.$emit('input', this.file);
        } else {
          let data = await this.transformToDataUrl(file);
          const formData = this.processData(data, file);
          Object.assign(this.file, {
            name: file.name,
            data,
            formData,
            progress: 0,
            url: ''
          })
          this.preview = data
          this.$emit('input', this.file);
        }
      },
      transformToDataUrl: async function(file) {
        let dataUrl = await this.transformFileToDataUrl(file);
        return dataUrl;
      },
      transformFileToFormData: function (file) {
        const formData = new FormData();
        // type
        formData.append('type', file.type);
        // size
        formData.append('size', file.size || 'image/jpeg');
        // name
        formData.append('name', file.name || 'no-name');
        // lastModifiedDate
        formData.append('lastModifiedDate', file.lastModifiedDate || new Date());
        // append 文件
        formData.append('file', file);
        return formData;
      },
      transformFileToDataUrl: function(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function(e) { // file转dataUrl是个异步函数，要将代码写在回调里
            const result = e.target.result;
            resolve(result);
          };
          reader.readAsDataURL(file);
        });
      },
      compress: async function (dataURL) {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = dataURL;
          img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let compressedDataUrl = canvas.toDataURL(this.imgFile.type, 1); // 压缩
            resolve(compressedDataUrl)
          }
        })
      },
      processData: function(dataUrl, file) {
        // 这里使用二进制方式处理dataUrl
        const binaryString = window.atob(dataUrl.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const intArray = new Uint8Array(arrayBuffer);

        for (let i = 0, j = binaryString.length; i < j; i++) {
          intArray[i] = binaryString.charCodeAt(i);
        }

        let blob;
        try {
          blob = new Blob([intArray], {type: file.type});
        } catch (error) {
          window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
          if (error.name === 'TypeError' && window.BlobBuilder) {
            const builder = new window.BlobBuilder();
            builder.append(arrayBuffer);
            blob = builder.getBlob(file.type);
          } else {
            throw new Error('版本过低，不支持上传图片');
          }
        }

        // blob 转file
        const fileOfBlob = new File([blob], file.name);
        const formData = new FormData();

        // type
        formData.append('type', file.type || 'image/jpeg');
        // size
        formData.append('size', fileOfBlob.size);
        // name
        formData.append('name', file.name || 'no-name');
        // lastModifiedDate
        formData.append('lastModifiedDate', file.lastModifiedDate || new Date());
        // append 文件
        formData.append('file', fileOfBlob);
        return formData;
      }
    },
    watch: {
      value: function(val) {
        this.file = val || this.file
      }
    }
  }
</script>

<style lang="scss" scoped>
  .file-input {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    input {
      font-size: 0;
      display: none;
      &::-webkit-file-upload-button {
        display: none;
      }
    }
    /* 上传图标 */
    label {
      display: inline-block;
      box-sizing: border-box;
      width: 112px;
      height: 112px;
      background: #fff;
      color: #333;
      border: 1PX dashed #b0b0b0;
      border-radius: 10px;
      position: relative;
      background-size: 95%;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__preview {
      position: relative;
      width: 112px;
      height: 112px;
      border-radius: 10px;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
      }
      .-remove {
        position: absolute;

      }
    }
  }

  @keyframes fadeInOut {
    0% {
      opacity: .6;
    }
    50% {
      opacity: .5;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes flow {
    0% {
      transform: rotate3D(0,0,1,0deg);
    }
    100% {
      transform: rotate3D(0,0,1,360deg);
    }
  }

  @-webkit-keyframes flow {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

</style>
