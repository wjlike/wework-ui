<template>
  <div class="chinaMap">
    <div ref="MapMountNode" style="width:800px;height:600px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    resize() {
      this.MapMountNode.resize();
    }
  },
  mounted() {
    this.$nextTick(() => {
      let option = {
        tooltip : {//提示框组件。
            trigger: 'item'//数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        },
        legend: {
            orient: 'horizontal',//图例的排列方向
            x:'left',//图例的位置
            data:['订单量']
        },

        visualMap: {//颜色的设置  dataRange
            x: 'left',
            y: 'center',
            splitList: [
                {start: 1500},
                {start: 900, end: 1500},
                {start: 310, end: 1000},
                {start: 200, end: 300},
                {start: 10, end: 200, label: '10 到 200（自定义label）'},
                {start: 5, end: 5, label: '5（自定义特殊颜色）', color: 'black'},
                {end: 10}
            ],
            min: 0,
            max: 25000000,
            calculable : true,//颜色呈条状
            text:['高','低'],// 文本，默认为数值文本
            color: ['#E0022B', '#E09107', '#A3E00B']
        },
        roamController: {//控制地图的上下左右放大缩小 图上没有显示
            show: true,
            x: 'right',
            mapTypeControl: {
                'china': true
            }
        },
        series : [
            {
                name: '订单量',
                type: 'map',
                mapType: 'china',
                roam: false,//是否开启鼠标缩放和平移漫游
                itemStyle: {   // 地图区域的配置
                  normal: {
                    label:{
                      show:true,//是否显示标签
                      textStyle: {
                          color: "rgb(0, 0, 0)"
                      }
                    },
                    areaColor: '#bc9aa9',  // 绘制的每一个轮廓的背景颜色
                    borderColor: '#111'
                  },
                  emphasis: {
                    label:{show:true},
                    areaColor: '#17b3a3',// 鼠标移到区域时的背景颜色
                  }
                },
                top:"3%",//组件距离容器的距离
                data:[
                    {name: '北京',value: Math.round(Math.random()*2000)},
                    {name: '天津',value: Math.round(Math.random()*2000)},
                    {name: '上海',value: Math.round(Math.random()*2000)},
                    {name: '重庆',value: Math.round(Math.random()*2000)},
                    {name: '河北',value: 0},
                    {name: '河南',value: Math.round(Math.random()*2000)},
                    {name: '云南',value: 5},
                    {name: '辽宁',value: 305},
                    {name: '黑龙江',value: Math.round(Math.random()*2000)},
                    {name: '湖南',value: 200},
                    {name: '安徽',value: Math.round(Math.random()*2000)},
                    {name: '山东',value: Math.round(Math.random()*2000)},
                    {name: '新疆',value: Math.round(Math.random()*2000)},
                    {name: '江苏',value: Math.round(Math.random()*2000)},
                    {name: '浙江',value: Math.round(Math.random()*2000)},
                    {name: '江西',value: Math.round(Math.random()*2000)},
                    {name: '湖北',value: Math.round(Math.random()*2000)},
                    {name: '广西',value: Math.round(Math.random()*2000)},
                    {name: '甘肃',value: Math.round(Math.random()*2000)},
                    {name: '山西',value: Math.round(Math.random()*2000)},
                    {name: '内蒙古',value: Math.round(Math.random()*2000)},
                    {name: '陕西',value: Math.round(Math.random()*2000)},
                    {name: '吉林',value: Math.round(Math.random()*2000)},
                    {name: '福建',value: Math.round(Math.random()*2000)},
                    {name: '贵州',value: Math.round(Math.random()*2000)},
                    {name: '广东',value: Math.round(Math.random()*2000)},
                    {name: '青海',value: Math.round(Math.random()*2000)},
                    {name: '西藏',value: Math.round(Math.random()*2000)},
                    {name: '四川',value: Math.round(Math.random()*2000)},
                    {name: '宁夏',value: Math.round(Math.random()*2000)},
                    {name: '海南',value: Math.round(Math.random()*2000)},
                    {name: '台湾',value: Math.round(Math.random()*2000)},
                    {name: '香港',value: Math.round(Math.random()*2000)},
                    {name: '澳门',value: Math.round(Math.random()*2000)}
                ]
            }
        ]
    };
      // this.MapMountNode = this.$echarts.init(
      //   this.$refs.MapMountNode
      // );
      // this.MapMountNode.setOption(option);
      // on(window, 'resize', this.resize)
    });
  },
  beforeDestroy() {
    //off(window, "resize", this.resize);
  }
};
</script>
