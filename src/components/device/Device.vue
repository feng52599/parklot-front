<template>
  <div>
    <div class="device-search">
      <el-input v-model="tableDataName" placeholder="请输入设备名" style="width:240px"></el-input>
      <el-button type="primary" @click="doFilter">搜索</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="addDevice">新增</el-button>
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
        prop="deviceName"
        label="设备名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deviceNum"
        label="设备数量">
      </el-table-column>
      <el-table-column
        :formatter="formatBoolean"
        prop="isUsed"
        label="使用状态">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
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
    <edit-form :dialog-visible="dialogVisible" :device="device" v-on:closeDialog="closeDialog"
               v-on:opSuccess="opSuccess"></edit-form>
  </div>
</template>

<script>
  import EditForm from './EditForm'

  export default {
    name: "Device.vue",
    components: {EditForm},
    // 要使表格刷新必须先引入，再在需要刷新的地方进行引用this.reload()
    inject:['reload'],
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
        dialogVisible: false,
        device: {},
      };
    },
    mounted: function () {
      this.loadDevices()
    },
    created() {
      // this.$axios.get('/user/getall').then(resp => {
      //   if (resp && resp.status === 200) {
      //     this.tableDataBegin = resp.data
      //     console.log(resp.data)
      //
      //   }
      // })
      // console.log("表格内容" + this.tableDataBegin)
      // this.totalItems = this.tableDataBegin.length;
      // console.log("总数"+this.totalItems)
      // if (this.totalItems > this.pageSize) {
      //   for (let index = 0; index < this.pageSize; index++) {
      //     this.tableDataEnd.push(this.tableDataBegin[index]);
      //   }
      // } else {
      //   this.tableDataEnd = this.tableDataBegin;
      // }
    },
    methods: {
      loadDevices() {
        this.$axios.get('/device/get').then(resp => {
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
          console.log(" value:" + value + "  index:" + index + "  datanamae" + this.tableDataName + "  value.name" + value.deviceName);
          console.log(value);
          if (value.deviceName) {
            if (value.deviceName.indexOf(this.tableDataName) >= 0) {
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
      addDevice() {
        this.dialogVisible = true
        this.device = {}
      },
      opSuccess() {
        this.$message.success("操作成功");
        this.reload();
      },
      closeDialog() {
        this.dialogVisible = false;
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.device = Object.assign({}, row);
        console.log("前端传下去的：");
        console.log(this.device);
        this.dialogVisible = true;
      },
      handleDelete(index, row) {
        console.log(index, row);
        console.log("操作的对象：");
        console.log(row);
        console.log("id" + row.id);
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios
              .post('/device/delete', {id: row.id}).then(resp => {
              if (resp && resp.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.reload();
              }
            })
          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      /*布尔值格式化：cellValue为后台返回的值
*/
      formatBoolean: function (row, column, cellValue) {
        var ret = ''  //你想在页面展示的值
        if (cellValue) {
          ret = "已使用"  //根据自己的需求设定
        } else {
          ret = "未使用"
        }
        return ret;
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
  .device-search {
    margin-bottom: 20px;
  }
  .pagework {
    margin-top: 20px;
  }
</style>
