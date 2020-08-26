<template>
  <div class="statisticBox">
    <div class="topSelect">
      <el-form :model="dataForm" ref="dataForm" label-width="100px">
        <el-row>


            <el-col :span="8">
               <el-form-item label="企业微信" prop="cropNames">
                <el-select v-model="dataForm.cropName" placeholder="请选择" width="220px" @change="handleChange">
                  <el-option
                    v-for="item in cropNames"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                 </el-form-item>
            </el-col>

          <el-col :span="8">
            <el-form-item prop="area" label="统计范围：">
              <el-cascader
                v-model="dataForm.area"
                :options="areaOptions"
                :separator="' | '"
                @change="handleChange"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="timeScape" label="时间筛选：">
              <el-select v-model="dataForm.timeScape" placeholder="请选择" width="220px" @change="handleChange">
                <el-option
                  v-for="item in scapeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bottomContent">
      <div class="content">
        <div class="echartsBox">
          <div class="echartsTitle">
            <span class="line"></span>
            <span>客户联系趋势图</span>
          </div>
          <div id="chart1" style="width: 100%; height: 100%;"></div>
        </div>
        <div class="echartsBox">
          <div class="echartsTitle">
            <span class="line"></span>
            <span>敏感词命中趋势图</span>
          </div>
          <div id="chart2" style="width: 100%; height: 100%;"></div>
        </div>
      </div>
      <div class="content bottomContent">
        <div class="echartsBox">
          <div class="echartsTitle">
            <span class="line"></span>
            <span>聊天总数趋势图</span>
          </div>
          <div id="chart3" style="width: 100%; height: 100%;"></div>
        </div>
        <div class="bottomLeft">
          <div class="echartsBox bottom">
            <div class="echartsTitle">
              <span class="line"></span>
              <span>已回复消息占比</span>
            </div>
            <div id="chart4" style="width: 100%; height: 100%;"></div>
          </div>
          <div class="echartsBox bottom">
            <div class="echartsTitle">
              <span class="line"></span>
              <span>发送消息数趋势图</span>
            </div>
            <div id="chart5" style="width: 100%; height: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  data () {
    return {
   
      areaOptions: [
        {
          value: 'S1',
          label: '事业一部',
          children: [
            {
              value: 'W1',
              label: '王一'
            },
            {
              value: 'Z2',
              label: '周二'
            }
          ]
        },
        {
          value: 'S2',
          label: '事业二部',
          children: [
            {
              value: 'Z3',
              label: '张三'
            },
            {
              value: 'L4',
              label: '李四'
            }
          ]
        },
        {
          value: 'S3',
          label: '事业三部',
          children: [
            {
              value: 'W5',
              label: '王五'
            }
          ]
        }
      ],
      scapeOptions: [
        {
          label: '近一周',
          value: '01'
        },
        {
          label: '近一月',
          value: '02'
        },
        {
          label: '近半年',
          value: '03'
        },
        {
          label: '近一年',
          value: '04'
        },
        {
          label: '近五年',
          value: '05'
        }
      ],
      dataForm: {
        area: ['S1', 'W1'],
        timeScape: '01',
        cropName:'小鹿斑比'
      },
      chart1: '',
      chart2: '',
      chart3: '',
      chart4: '',
      chart5: '',
      chartArr: ['客户联系趋势图', '敏感词命中趋势图', '聊天总数趋势图', '已回复消息占比', '发送消息数趋势图'],
      cropNames:[
        {
           value: '123',
           label: '小鹿斑比'
         }
      ],
    }
  },
  mounted () {
    this.chartArr.forEach((v,index) => {
      this.changeLine(index/1+1, v)
    })
  },
  methods: {
    // 改变选择范围时
    handleChange (e) {
      console.log(e)
      this.chartArr.forEach((v,index) => {
        this.changeLine(index/1+1, v)
      })
    },
    // 改变echart
    changeLine(item, title){
      this.$nextTick(() => {
        this['chart'+item] = echarts.init(document.getElementById('chart'+item));
        // 判断当前的时间段
        this.dealTime(this.dataForm.timeScape).then((res) => {
          var x = res
          var y = []
          console.log(x)
          x.forEach(v => {
            if (item == 4) {
              y.push({
                value: Math.floor(Math.random()*(20-5+1)+10)*item*10,
                name: v
              })
            } else {
              y.push(Math.floor(Math.random()*(20-5+1)+10)*item*10)
            }
          })
            // title: { text: title },
          this['chart'+item].setOption({
            tooltip: {},
            xAxis: {
              show: item != 4,
              type: 'category',
              data: x
            },
            grid: {
              // top: '-10%',
              left: '3%',
              right: '4%',
              top: '5%',
              containLabel: true
            },
            yAxis: {
              show: item != 4,
              type: 'value'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} : {c} ({d}%)'
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              data: x
            },
            series: [{
              center: ['40%', '50%'],
              data: y,
              type: item == 4 ? 'pie' : 'line'
            }]
          });
        })
      })
    },
    // 根据时间段处理横轴数据
    dealTime (val) {
      return new Promise((res, rej) => {
        var x = []
        var time = new Date()
        var month = time.getMonth()/1+1
        var day = time.getDate()
        var year = time.getFullYear()
        // 判断前一月是不是闰月
        switch (val) {
          case '01': // 近一周
            var i = 0
            var prevM = month - 1 < 0 ? 12 : month-1
            var date = this.returnDate(prevM, year)
            while(i<7){
              if (day-i<=0) {
                x.unshift(date+(day-i))
              } else {
                x.unshift(day-i)
              }
              i++;//变量更新，是为了避免出现“死循环”
            }
            res(x)
            break;
          case '02': // 近一月
            var i = 0
            var prevM = month - 1 < 0 ? 12 : month-1
            var date = this.returnDate(prevM, year)
            while(i<date){
              if (day-i<=0) {
                x.unshift(date+(day-i))
              } else {
                x.unshift(day-i)
              }
              i++;//变量更新，是为了避免出现“死循环”
            }
            res(x)
            break;
          case '03': // 近半年
            var i = 0
            while(i<6){
              if (month-i<=0) {
                x.unshift(12+(month-i))
              } else {
                x.unshift(month-i)
              }
              i++;//变量更新，是为了避免出现“死循环”
            }
            res(x)
            break;
          case '04': // 近一年
            var i = 0
            while(i<12){
              if (month-i<=0) {
                x.unshift(12+(month-i))
              } else {
                x.unshift(month-i)
              }
              i++;//变量更新，是为了避免出现“死循环”
            }
            res(x)
            break;
          default:
            var i = 0
            while(i<5){
              x.unshift(year-i)
              i++;//变量更新，是为了避免出现“死循环”
            }
            res(x)
            break;
        }
      })
    },
    // 判断当前月是否是闰月
    returnDate (month, year) {
      var bigMArr = [1, 3, 5, 7, 8, 10, 12]
      if (bigMArr.includes(month)) {
        return 31
      } else if (month == 2) {
        if (year%4==0&&year%100!=0||year%400==0) {
          return 29
        } else {
          28
        }
      } else {
        30
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .topSelect {
    /deep/.el-form .el-select {
      width: 200px!important;
    }
  }
  .bottomContent {
    width: 100%;
    height: auto;
    background: #eee;
    border-radius: 5px;
    .echartsBox {
      box-sizing: border-box;
      width: 49%;
      border-radius: 5px;
      height: 100%;
      padding: 10px;
      background: #fff;
      .echartsTitle {
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          color: #666;
          font-size: 14px;
          &.line {
            width: 3px;
            height: 15px;
            margin-right: 5px;
            background: #1061a1;
          }
        }
      }
    }
    .content {
      width: 100%;
      height: 250px;
      display: flex;
      padding: 10px;
      justify-content: space-around;
    }
    .bottomContent {
      height: 350px;
      padding-top: 0;
      .bottomLeft {
        width: 49%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .bottom {
          width: 100%;
          height: 49%;
        }
      }
    }
  }
</style>
