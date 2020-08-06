<template>
  <!-- 外层的遮罩层 -->
  <div class="mask">
    <!-- 小xx -->
    <span class="cancel" @click="cancel">
      <i class="el-icon-close"></i>
    </span>
    <!-- 放图的box 以及 前进和后退 -->
    <div class="center">
      <div class="swiperBtn left" @click="prev">
        <i class="el-icon-arrow-left"></i>
      </div>
      <img :src="currentUrl()" :style="imgStyle" />
      <div class="swiperBtn right" @click="next">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="footer">
      <!-- 缩小 -->
      <i class="el-icon-zoom-out" @click="handelAction('zoomOut')"></i>
      <!-- 放大 -->
      <i class="el-icon-zoom-in" @click="handelAction('zoomIn')"></i>
      <!-- 左旋 -->
      <span @click="handelAction('left')">
          <img src="../../assets/img/left.png" alt="">
      </span>
      <!-- 右旋 -->
      <span @click="handelAction('right')">
          <img src="../../assets/img/right.png" alt="">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      urlList: [
        "https://c-ssl.duitang.com/uploads/item/201911/17/20191117144639_ULPFN.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201911/17/20191117144639_2arBG.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201911/07/20191107120532_aKNMk.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201911/07/20191107120532_Hnf3X.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201911/07/20191107120533_ymS5W.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201911/07/20191107120533_dXMVA.thumb.700_0.jpeg",
        "https://c-ssl.duitang.com/uploads/item/201911/07/20191107111809_mZzRk.thumb.700_0.jpeg"
      ],
      i: 0,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    };
  },
  mounted() {
      this.i = this.index;
	  this.urlList = this.list;
  },
  props:['list','index'],
  watch:{
      'list'(e){
          this.urlList = e;
      },
      'index'(e){
          this.index = e;
      }
  },
  computed:{
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      };
      return style;
    }
  },
  methods: {
    currentUrl() {
      return this.urlList[this.i];
    },
    handelAction(action, options = {}) {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      const { transform } = this;
      switch (action) {
        case "zoomOut":
          if (transform.scale > 0.2) {
            transform.scale = parseFloat(
              (transform.scale - zoomRate).toFixed(3)
            );
          }
          break;
        case "zoomIn":
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case "left":
          transform.deg += rotateDeg;
          break;
        case "right":
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    },
    cancel() {
      this.$emit('close');
    },
    // 上一页
    prev(){
        this.i = this.i === 0 ? this.urlList.length-1 : this.i-=1;
        this.rest();
    },
    // 下一页
    next(){
        this.i = this.i === this.urlList.length-1 ? 0 : this.i+=1;
        this.rest();
    },
    rest(){
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(65, 62, 62, 0.623);
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 1050;
  .cancel {
    position: absolute;
    right: 10%;
    top: 10%;
    z-index: 1055;
    background: rgba(175, 167, 167, 0.664);
    padding: 10px;
    cursor: pointer;
    border-radius: 100%;
    &:hover {
      background: rgba(175, 167, 167, 0.5);
    }
    i {
      font-size: 18px;
      color: #fff;
    }
  }
  .center {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    overflow: hidden;
    .swiperBtn {
      padding: 13px;
      border-radius: 100%;
      background: rgba(175, 167, 167, 0.664);
      cursor: pointer;
      i {
        font-size: 18px;
        color: #fff;
      }
      &:hover {
        background: rgba(175, 167, 167, 0.5);
      }
    }
    img {
       height:100%; 
    }
  }
  .footer {
    position: absolute;
    bottom: 10%;
    z-index: 1055;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(175, 167, 167, 0.664);
    border-radius: 25px;
    display:flex;
    align-items:center;
    span{
        display:inline-block;
        margin: 10px;
        cursor: pointer;
        width:27px;
        height:27px;
        img{
            width:100%;
        }
    }
    i {
      margin: 10px;
      cursor: pointer;
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>
