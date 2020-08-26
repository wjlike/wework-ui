<template>
  <div id="chartBox" :style="styleObject">

  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  prop: ['width', 'height', 'option'],
  data () {
    return {
      styleObject: {}
    } 
  },
  mounted () {
    this.styleObject = {
      'height': this.height,
      'width': this.width
    }
  }
}
</script>

<style lang="scss" scoped>

</style>