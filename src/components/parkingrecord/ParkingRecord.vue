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
        :formatter="dateFormat"
        prop="beginTime"
        label="入库时间">
      </el-table-column>
      <el-table-column
        :formatter="dateFormat"
        prop="endTime"
        label="出库时间">
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
  </div>
</template>

<script>

  import echarts from 'echarts'
  import * as moment from "moment";


  export default {
    name: "ParkingRecord.vue",
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
        pageSize: 8,
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
      this.loadRecord()
    },
    methods: {
      dateFormat:function(row,column){

        var date = row[column.property];

        if(date == undefined){return ''};

        return moment(date).format("YYYY-MM-DD HH:mm:ss")

      },


      loadRecord() {
        this.$axios.get('/parking/getall').then(resp => {
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
          console.log(" value:" + value + "  index:" + index + "  datanamae" + this.tableDataName + "  value.name" + value.plate);
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
