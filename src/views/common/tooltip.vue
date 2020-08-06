<template>
    <el-tooltip :content="content" :disabled="disabled" effect="dark" placement="top-start" :hide-after="2000">
        <slot></slot>
    </el-tooltip>
</template>

<script>
export default {
  data() {
    return {
      disabled:""
    }
  },
  created () {
    // 判断是否是中文字符
    var cnText = /[\u4E00-\u9FA5\\s]+/;
    if(cnText.test(this.content)){
      this.disabled = this.content.length < 8
    }else{
      this.disabled = this.content.length < 14
    }
  },
  props: {
    content: {
      type: String
    }
  }
};
</script>
