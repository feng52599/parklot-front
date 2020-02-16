<template>

  <el-dialog title="" :visible="dialogVisible" width="40%" @close="closeDialog">
    <el-form ref="userForm" label-position="left" label-width="100px" :model="user" size="small">
      <el-form-item label="用户名">
        <el-input v-model="user.username" required></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" required></el-input>
      </el-form-item>
      <el-form-item style="height: 0">
        <el-input type="hidden" v-model="user.id" autocomplete="off"></el-input>
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
    props: ['dialogVisible', 'user'],
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          username: '',
          password: '',
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
        console.log(this.user)

        this.$axios
          .post('/user/merge',
            {
              "id": this.user.id,
              "username": this.user.username,
              "password": this.user.password
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
