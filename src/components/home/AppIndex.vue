<template>
  <div>
    <el-card class="box-card">
      <div v-model="remainingSpace" class="text item">
        总车位[500]<br>
        当前停车场剩余{{remainingSpace}}个车位
      </div>
    </el-card>
    <div>
      <div id="main" style="width:900px ;height:300px;"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: "AppIndex.vue",
    data() {
      return {
        spaceData: [],
        parkingSpace: 0,
        remainingSpace: 0
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getRemain()
        this.getPie()
      })
    },
    methods: {
      getRemain(){
        this.$axios
          .get('/space/getspace').then(resp => {
          if (resp && resp.status === 200) {
            this.remainingSpace = resp.data;
          } else {
            this.$alert(res.message, '', {type: 'error'});
          }
        })
      },
      getPie() {
        // 绘制图表
        var _this = this;
        var myChart = echarts.init(document.getElementById('main'))
        this.$axios.get('/space/get').then(resp => {
          if (resp && resp.status === 200) {
            this.spaceData = resp.data
            // this.parkingSpace = resp.data[0].parkingSpace
            this.spaceData.forEach((value, index) => {
              console.log(" value:" + value + "  index:" + index + "  datanamae" + this.spaceData + "  value.parkingSpace" + value.parkingSpace + "value.remainingSpace " + value.remainingSpace);
              console.log(value);
              console.log(value.remainingSpace)
              let main = this.$echarts.init(document.getElementById("main"));
              main.setOption({
                //标题
                title: {
                  text: '停车场管理系统',
                  x: 'left',              //标题位置
                  // textStyle: { //标题内容的样式
                  //   color: '#000',
                  //   fontStyle: 'normal',
                  //   fontWeight: 100,
                  //   fontSize: 16 //主题文字字体大小，默认为18px
                  // },
                },
                // stillShowZeroSum: true,
                //鼠标划过时饼状图上显示的数据


                tooltip: {
                  trigger: 'item',
                  formatter: '{a}<br/>{b}:{c} ({d}%)'
                },
                //图例
                legend: {//图例  标注各种颜色代表的模块
                  // orient: 'vertical',//图例的显示方式  默认横向显示
                  bottom: 10,//控制图例出现的距离  默认左上角
                  left: 'center',//控制图例的位置
                  // itemWidth: 16,//图例颜色块的宽度和高度
                  // itemHeight: 12,
                  textStyle: {//图例中文字的样式
                    color: '#000',
                    fontSize: 16
                  },
                  data: ['已停车位', '剩余车位']//图例上显示的饼图各模块上的名字
                },
                //饼图中各模块的颜色
                color: ['#FF0000', '#0000FF'],
                // 饼图数据
                series: {
                  // name: 'bug分布',
                  type: 'pie',             //echarts图的类型   pie代表饼图
                  radius: '70%',           //饼图中饼状部分的大小所占整个父元素的百分比
                  center: ['50%', '50%'],  //整个饼图在整个父元素中的位置
                  // data:''               //饼图数据
                  data: [                  //每个模块的名字和值
                    {name: '已停车位', value: value.parkingSpace},
                    {name: '剩余车位', value: value.remainingSpace},
                    // { name: '已完成', value: 50 }
                  ],
                  itemStyle: {
                    normal: {
                      label: {
                        show: true,//饼图上是否出现标注文字 标注各模块代表什么  默认是true
                        // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
                      },
                      labelLine: {
                        show: true//官网demo里外部标注上的小细线的显示隐藏    默认显示
                      }
                    }
                  },
                }

              })

            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>
