<template>
  <div>
    <div class="user-search">
      <el-input v-model="tableDataName" placeholder="请输入用户名" style="width:240px"></el-input>
      <el-button type="primary" @click="doFilter">搜索</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="addUser">新增</el-button>
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
        prop="clientName"
        label="协议客户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="clientPlate"
        label="协议车牌">
      </el-table-column>
      <el-table-column
        prop="clientBegin"
        label="协议起始时间">
      </el-table-column>
      <el-table-column
        prop="clientEnd"
        label="协议协议结束时间">
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
    <edit-form :dialog-visible="dialogVisible" :client-user="clientUser" v-on:closeDialog="closeDialog"
               v-on:opSuccess="opSuccess"></edit-form>
  </div>
</template>

<script>
  import EditForm from './EditForm'

  export default {
    name: "ClientUser.vue",
    components: {EditForm},
    inject: ['reload'],
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
        pageSize: 5,
        totalItems: 0,
        filterTableDataEnd: [],
        flag: false,
        dialogVisible: false,
        clientUser: {},
      };
    },
    mounted: function () {
      this.loadClientUsers()
    },
    methods: {
      loadClientUsers() {
        this.$axios.get('/client/getall').then(resp => {
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
          if (value.username) {
            if (value.username.indexOf(this.tableDataName) >= 0) {
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
      addUser() {
        this.dialogVisible = true
        this.clientUser = {}
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
        this.clientUser = Object.assign({}, row);
        console.log("前端传下去的：");
        console.log(this.user);
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
              .post('/client/delete', {id: row.id}).then(resp => {
              if (resp && resp.status === 200) {
                this.reload();
                this.$message.success("删除成功");
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
  .user-search {
    margin-bottom: 20px;
  }
  .pagework{
    margin-top: 20px;
  }
</style>
