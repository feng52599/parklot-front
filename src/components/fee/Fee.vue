<template>
  <div>
    <div class="fee-search">
      <el-input v-model="tableDataName" placeholder="请输入车牌号" style="width:240px"></el-input> &nbsp;&nbsp;
      <el-button type="primary" @click="doFilter">搜索</el-button>
    </div>
    <!--<el-button type="primary" @click="openData">展示数据</el-button>-->
    <el-table
      :data="tableDataEnd"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="plate"
        label="车牌"
        width="180">
      </el-table-column>
      <el-table-column
        prop="parkingFee"
        label="付款金额">
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        prop="payTime"
        label="付款时间">
      </el-table-column>
    </el-table>
    <div class="pagework">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="totalItems">
      </el-pagination>
    </div>
    <div class="line-chart">
      <div id="mainfee" style="width: 900px;height: 400px;"></div>
    </div>
  </div>
</template>

<script>

  import echarts from 'echarts'
  import * as moment from "moment";


  export default {
    name: "Fee.vue",
    data() {
      /*
        tableDataBegin 初始值
        tableDataend 最终使用的值
       */
      return {
        tableDataBegin: [],
        tableDataName: "",
        tableDataEnd: [],
        currentPage: 1,
        pageSize: 4,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,

        charts: '',
        /*  opinion: ["1", "3", "3", "4", "5"],*/
        opinionData: ["3", "2", "4", "4", "50"],
        spaceData: []
      };
    },
    mounted: function () {
      this.loadFee()
      this.drawLine('mainfee')
    },
    methods: {
      dateFormat:function(row,column){

        var date = row[column.property];

        if(date == undefined){return ''};

        return moment(date).format("YYYY-MM-DD HH:mm:ss")

      },

      drawLine(id) {
        var myChart = echarts.init(document.getElementById(id))
        // this.charts = echarts.init(document.getElementById(id))
        this.$axios.get('/fee/getseven').then(resp => {
          if (resp && resp.status === 200) {
            this.spaceData = resp.data
            // this.parkingSpace = resp.data[0].parkingSpace
            const datelist = [];
            const feelist = [];
            console.log("spaceData");
            console.log(this.spaceData);
            this.spaceData.forEach((value, index) => {
              // console.log(" value:" + value + "  index:" + index + "  datanamae" + this.spaceData + "  value.parkingSpace" + value.parkingSpace + "value.remainingSpace " + value.remainingSpace);
              // console.log(value);
              // console.log(value.remainingSpace)
              // this.parkingSpace = value.parkingSpace;
              // this.remainingSpace = value.remainingSpace;
              // this.getParkingSpace(value.parkingSpace)
              // this.getRemainingSpace(value.remainingSpace)
              // if (value.username) {
              //   if (value.username.indexOf(this.tableDataName) >= 0) {
              //     this.filterTableDataEnd.push(value)
              //   }
              // }
              console.log(" value:" + value + "  index:" + index + "  value.parkingSpace" + value.date + "value.remainingSpace " + value.parkingFees);
              datelist.push(value.date);
              feelist.push(value.parkingFees);


            });
            console.log(datelist);
            console.log(feelist);
            let main = this.$echarts.init(document.getElementById(id));
            main.setOption({
              //标题
              title: {
                text: '近七天收入示意图',
                x: 'left',              //标题位置
                textStyle: { //标题内容的样式
                  color: '#FF0000',
                  fontStyle: 'normal',
                  fontWeight: 100,
                  fontSize: 16 //主题文字字体大小，默认为18px
                },
              },
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['总收入']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },

              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datelist

              },
              yAxis: {
                type: 'value'
              },

              series: [{
                name: '总收入',
                type: 'line',
                stack: '总量',
                data: feelist
              }]

            })
          }
        })


      },


      loadFee() {
        this.$axios.get('/fee/get').then(resp => {
          if (resp && resp.status === 200) {
            this.tableDataBegin = resp.data
            console.log("后端返回的结果：（有此条返回成功）")


            console.log(this.tableDataBegin)
          }
          this.totalItems = this.tableDataBegin.length;
          if (this.totalItems > this.pageSize) {
            for (let index = 0; index < this.pageSize; index++) {
              this.tableDataEnd.push(this.tableDataBegin[index]);
            }
          } else {
            this.tableDataEnd = this.tableDataBegin;
          }
        })
      },
      //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
      //用两个变量接收currentChangePage函数的参数
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableDataEnd = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = []
        console.log(" 数据初始值 " + this.tableDataBegin)
        this.tableDataBegin.forEach((value, index) => {
          console.log(" value:" + value + "  index:" + index + "  datanamae" + this.tableDataName + "  value.name" + value.name);
          console.log(value);
          if (value.plate) {
            if (value.plate.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value)
            }
          }
        });


        //页面数据改变重新统计数据数量和当前页
        this.currentPage = 1
        this.totalItems = this.filterTableDataEnd.length
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd)
        //页面初始化数据需要判断是否检索过
        this.flag = true
      },


      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if (!this.flag) {
          this.currentChangePage(this.tableDataBegin);
          console.log(this.tableDataEnd);
        } else {
          this.currentChangePage(this.filterTableDataEnd);
          console.log(this.tableDataEnd);
        }
      },//组件自带监控当前页码

      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }
    }
  };
</script>
<style>
  .fee-search {
    margin-bottom: 20px;
  }

  .pagework {
    margin-top: 20px;
  }

  .line-chart{
    margin-top: 20px;
  }
</style>
