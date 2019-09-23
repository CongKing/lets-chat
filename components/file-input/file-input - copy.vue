<template>
  <div class="file-input" >
    <input id="rdInput" multiple="multiple" @change="onFileChange" :value="innerVal" ref="inputer" type="file"/>
    <label for="rdInput" v-show="count < maxUpload"></label>
    <div :class="{'preview': true, 'full-select': count >= maxUpload}">
      <div :style="{'backgroundImage': (file.data.indexOf('data:application') !== -1 || file.data.indexOf('.pdf') !== -1) ? '' : 'url('+ file.data + ')'}"
           v-for="(file, index) in files"
           :key="index">
        <div :class="{'progress': true, 'fade': file.progress >= 100}" :style="{'height': file.progress + '%'}"></div>
        <em @click="remove(index)"></em>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FileInput',
    data () {
      return {
        files: [],
        count: 0,
        innerVal: ''
      }
    },
    props: {
      fileMaxSize: {
        type: Number,
        default: (1024 * 10 * 1024)
      },
      maxUpload: {
        type: Number,
        default: 5
      },
      accept: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      remove: function(index) {
        let fileBeRemove = this.files[index];
        this.files.splice(index, 1);
        this.$emit('delete', fileBeRemove);
        this.count--;
      },
      onFileChange: async function(event) {
        const files = Array.prototype.slice.call(event.target.files);
        this.innerVal = '';
        if ((files.length + this.files.length) > this.maxUpload) {
          files.splice((this.maxUpload - this.files.length));
          this.$emit('error', '最多只支持上传5张图片');
        }

        let file = {};
        for (let i = 0; i < files.length; i++) {
          if (this.count >= this.maxUpload) break;
          file = files[i];
          if (['jpeg', 'png', 'gif', 'jpg', 'pdf'].indexOf(file.type.split('/')[1]) < 0) {
            this.$emit('error', '请上传图片文件或者pdf文件');
            return;
          }
          if (file.size > this.fileMaxSize) {
            this.$emit('error', '文件不能超过10M');
            return;
          }
          if (this.files.find((_file) => _file.name === file.name)) {
            return;
          }
          this.count++;
          this.handleSingleFile(file);
        }
      },
      handleSingleFile: async function(file) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          const formData = this.transformFileToFormData(file);
          let data = await this.transformToDataUrl(file);
          this.files.push({name: file.name, data, formData, progress: 0, url: ''});
          this.$emit('input', this.files);
        } else {
          let data = await this.transformToDataUrl(file);
          const formData = this.processData(data, file);
          this.files.push({name: file.name, data, formData, progress: 0, url: ''});
          this.$emit('input', this.files);
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
        this.files = val || this.files;
        this.count = this.files.length;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .file-input {
    display: flex;
    padding: 30px;
    /* 图片预览 */
    .preview {
      height: 112px;
      flex: 1;
      justify-content: space-between;
      &.full-select{
        display: flex;
        canvas, img, div {
          margin-right: 0;
        }
      }
      canvas, img, div {
        box-sizing: border-box;
        display: inline-block;
        width: 112px;
        height: 112px;
        background-size: 112px auto;
        background-repeat: no-repeat;
        background-image: url('/static/image/icon/preview.png');
        position: relative;
        margin-right: 30px;
        &:last-child{
          margin-right: 0;
        }
        .progress{
          content: '';
          display: block;
          width: 100%;
          opacity: .6;
          background: #22ccc4;
          position: absolute;
          bottom: 0;
          left: 0;
          transition: height 0.5s ease-in-out;
          &.fade{
            animation: fadeInOut 0.5s ease-in-out .8s 1 forwards;
          }
        }
        em {
          content: '';
          width: 20px;
          height: 20px;
          display: block;
          position: absolute;
          top: -10px;
          right: -10px;
          background-image: url(/static/images/icon/delete.png);
          background-repeat: no-repeat;
          background-size: 20px 20px;
        }
      }
    }
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
      border: 1PX dashed #10aeff;
      border-radius: 5px;
      position: relative;
      margin-right: 30px;
      &::before {
        content: '';
        display: block;
        width: 40px;
        height: 4px;
        background: #10aeff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2PX;
      }
      &::after {
        content: '';
        display: block;
        width: 4px;
        height: 40px;
        background: #10aeff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2PX;
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
