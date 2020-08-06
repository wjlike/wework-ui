<template>
    <!--图片裁剪框 start-->
<div class="tailoring-container" v-loading="loading">
    <div class="black-cloth" @click="closeTailor()"></div>
    <div class="tailoring-content">
            <div class="tailoring-content-one">
                <label title="上传图片" for="chooseImg" class="l-btn choose-btn">
                    <input type="file" accept="image/jpg,image/jpeg,image/png" name="file" id="chooseImg" class="hidden" @change="selectImg($event)">
                    选择图片
                </label>
                <div class="close-tailoring"  @click="closeTailor()">×</div>
            </div>
            <div class="tailoring-content-two">
                <vue-cropper autoCrop :img="option.img" ref="cropper" centerBox/>
            </div>
            <div class="tailoring-content-three">
                <button class="l-btn cropper-reset-btn" @click="refresh">复位</button>
                <button class="l-btn cropper-rotate-btn" @click="rotateLeft">左旋转</button>
                <button class="l-btn cropper-scaleX-btn" @click="rotateRight">右旋转</button>
                <button id="sureCut" :class="hasImg?'l-btn sureCut':'l-btn sureCut disabled'" @click="hasImg?submit('blob'):init()">确定</button>
            </div>
        </div>
</div>

</template>

<script>
import { VueCropper } from 'vue-cropper'
import Vue from 'vue'
export default {
    data () {
        return {
            option:{
                img:''
            },
            loading:false,
            hasImg:false
        }
    },
    mounted(){

    },
    components:{
        VueCropper
    },
    methods: {
        init () {
        },
        // 关闭裁剪框
        closeTailor() {
            this.$emit('closeImg')
        },
        // 上传图片
        selectImg(e) {
            var _this = this;
            //上传图片 
            var file = e.target.files[0] 
            _this.fileName = file.name;
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) { 
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') 
                return false 
            } 
            var reader = new FileReader(); 
            reader.onload =(e) => { 
                let data; 
                if (typeof e.target.result === 'object') { 
                    // 把Array Buffer转化为blob 如果是base64不需要 
                    data = window.URL.createObjectURL(new Blob([e.target.result])) 
                } 
                else { 
                    data = e.target.result 
                }
                 _this.option.img = data 
                 _this.hasImg = true;
            } 
            // 转化为base64 
            // reader.readAsDataURL(file) 
            // 转化为blob 
            reader.readAsArrayBuffer(file);
        },
        //左旋转
        rotateLeft() { 
            console.log('rotateLeft')
            this.$refs.cropper.rotateLeft(); 
        }, 
        //右旋转
        rotateRight() { 
            console.log('rotateRight')
            this.$refs.cropper.rotateRight(); 
        }, 
        // 复位
        refresh(){
            this.$refs.cropper.refresh();
        },
        // 开始裁减
        submit(type){
            let _this = this;
            let formData = new FormData();
            this.loading = true;
            // 输出 
            if (type === 'blob') { 
                this.$refs.cropper.getCropBlob((data) => { 
                    _this.downImg = window.URL.createObjectURL(data)
                    formData.append("image_data", data);
                    _this.$http({
                        url: this.$http.adornUrl('/sys/header/save'),
                        method: 'post',
                        data: formData,
                        headers:{'Content-Type': 'multipart/form-data','token': Vue.cookie.get('token')}
                    })
                    .then((response)=>{
                        this.loading = false;
                        var res = response.data;
                        if(res.code==0){
                            _this.$message.success('更换图片成功')
                            _this.closeTailor();
                            _this.$emit('changeImg')
                        }else{
                            _this.$message.error(res.msg)
                            _this.closeTailor();
                        }
                    })
                }) 
            } else { 
                this.$refs.cropper.getCropData((data) => { 
                    _this.downImg = data;
                    console.log(data)
                }) 
            } 
        }

    }
}
</script>

<style scoped>
.l-btn{
    display: inline-block;
    outline: none;
    resize: none;
    border: none;
    padding:5px 10px;
    background: #17b3a3;
    color: #fff;
    border:solid 1px #17b3a3;
    border-radius: 3px;
    font-size: 14px;
}
.l-btn:hover{
    background: #1bddca;
    animation: anniu 1s infinite;
}
.l-btn:active{
    box-shadow: 0 2px 3px rgba(0,0,0,.2) inset;
}
.l-btn.disabled{
    background:rgba(27,27,27,.2);
}
.l-btn.disabled:hover{
    background:rgba(0, 0, 0, 0.2);
}
.hidden{
    display: none;
}
.tailoring-container, .tailoring-container div, .tailoring-container p{
    margin: 0;padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}
.tailoring-container{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
}
.tailoring-container .black-cloth{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #111;
    opacity: .9;
    z-index: 1001;
}
.tailoring-container .tailoring-content{
    position: absolute;
    width: 768px;
    height: 560px;
    background: #fff;
    z-index: 1002;
    left: 0;
    top: 0;

    /* 水平垂直居中 浏览器版本号低的不支持transform */
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -weblit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);

    border-radius: 10px;
    box-shadow: 0 0 10px #000;
    padding: 10px;
}

.tailoring-content-one{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #DDD ;
}
.tailoring-content .choose-btn{
    float: left;
}
.tailoring-content .close-tailoring{
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background: #eee;
    color: #fff;
    font-size: 22px;
    text-align: center;
    line-height: 30px;
    float: right;
    cursor: pointer;
}
.tailoring-content .close-tailoring:hover{
    background: #ccc;
}

.tailoring-content .tailoring-content-two{
    width: 100%;
    height: 460px;
    position: relative;
    padding: 5px 0;
}
.tailoring-content .tailoring-box-parcel{
    width: 520px;
    height: 450px;
    position: absolute;
    left: 0;
    border: solid 1px #ddd;
}
.tailoring-content .preview-box-parcel{
    display: inline-block;
    width: 228px;
    height: 450px;
    position: absolute;
    right: 0;
    padding: 4px 14px;
}
.preview-box-parcel p{
    color: #555;
}
.previewImg{
    width: 200px;
    height: 200px;
    overflow: hidden;
}
.preview-box-parcel .square{
    margin-top: 10px;
    border: solid 1px #ddd;
}
.preview-box-parcel .circular{
    border-radius: 100%;
    margin-top: 10px;
    border: solid 1px #ddd;
}

.tailoring-content .tailoring-content-three{
    width: 100%;
    height: 40px;
    border-top: 1px solid #DDD ;
    padding-top: 10px;
}
.sureCut{
    float: right;
}

@media all and (max-width: 768px) {
    .tailoring-container .tailoring-content{
        width: 100%;
        min-width: 320px;
        height: 460px;
    }
    .tailoring-content .tailoring-content-two{
        height: 360px;
    }
    .tailoring-content .tailoring-box-parcel{
        height: 350px;
    }
    .tailoring-container .tailoring-box-parcel{
        width: 100%;
    }
    .tailoring-container .preview-box-parcel{
        display: none;
    }

}

</style>


<style scoped>

</style>


