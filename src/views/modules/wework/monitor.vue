<template>
   <div id="chartColumn" style="width: 100%; height: 300px;">
   </div>
</template>

<script>
   import echarts from 'echarts'
          export default {
              data(){
                  return {
                      chartColumn: null
                  }
              },
              mounted() {
                  this.drawLine();
                  setInterval(this.drawLine, 5000);
              },
              methods: {
                  drawLine(){
                      this.chartColumn = echarts.init(document.getElementById('chartColumn'));

                      this.chartColumn.setOption({
                        title: { text: '风险监控' },
                        tooltip: {},
                        xAxis: {
                          type: 'category',
                          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                          type: 'value'
                        },
                        series: [{
                          data: [Math.random(10), Math.random(10), Math.random(10), Math.random(10), Math.random(10), Math.random(10), Math.random(10)],
                          type: 'line'
                        }]
                  });
                  }
              }
          }
</script>

<style>
</style>
