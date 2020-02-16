<template>

  <el-dialog title="" :visible="dialogVisible" width="40%" @close="closeDialog">
    <el-form ref="clientUserForm" label-position="left" label-width="100px" :model="clientUser" size="small">
      <el-form-item label="协议客户名">
        <el-input v-model="clientUser.clientName" required></el-input>
      </el-form-item>
      <el-form-item label="协议车牌">
        <el-input v-model="clientUser.clientPlate" required></el-input>
      </el-form-item>
      <el-form-item label="协议客户电话">
        <el-input v-model="clientUser.phone" required></el-input>
      </el-form-item>
      <el-form-item label="协议时间">
        <el-date-picker
          v-model="clientUser.clientBegin"
          type="date"
          placeholder="起始日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        <el-date-picker
          v-model="clientUser.clientEnd"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="height: 0">
        <el-input type="hidden" v-model="clientUser.id" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
     <el-button type="info" size="small" @click="closeDialog">取 消</el-button>
     <el-button type="success" size="small" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  export default {
    name: "EditForm",
    props: ['dialogVisible', 'clientUser'],
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          clientName: '',
          clientPlate: '',
          phone: '',
          clientBegin: '',
          clientEnd: '',
        },
      }
    },
    methods: {
      onSave() {
        // post('/park/parkLot/save', {
        //   parkLot: JSON.stringify(Object.assign({}, this.parkLot)).then((res) => {
        //     if (res.success) {
        //       this.closeDialog();
        //     } else {
        //       this.$alert(res.message, '', {type: 'error'});
        //     }
        //   }),
        //
        // });
        // this.$axios.post('/user/merge', {
        //   user: JSON.stringify(Object.assign({}, this.user)).then(resp => {
        //     if (resp && resp.status === 200) {
        //       this.closeDialog();
        //     } else {
        //       this.$alert(res.message, '', {type: 'error'});
        //     }
        //   })
        // })
        console.log(this.clientUser)

        this.$axios
          .post('/client/merge',
            {
              "id": this.clientUser.id,
              "clientName": this.clientUser.clientName,
              "clientPlate": this.clientUser.clientPlate,
              "phone": this.clientUser.phone,
              "clientBegin": this.clientUser.clientBegin,
              "clientEnd": this.clientUser.clientEnd,
            }
          ).then(resp => {
          if (resp && resp.status === 200) {
            this.closeDialog();
            this.$emit("opSuccess");
          } else {
            this.$alert(res.message, '', {type: 'error'});
          }
        })
      },
      closeDialog() {
        this.$emit("closeDialog");
      },
    }
  }
</script>

<style scoped>

</style>
