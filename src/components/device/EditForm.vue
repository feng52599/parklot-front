<template>

  <el-dialog title="" :visible="dialogVisible" width="40%" @close="closeDialog">
    <el-form ref="deviceForm" label-position="left" label-width="100px" :model="device" size="small">
      <el-form-item label="设备名">
        <el-input v-model="device.deviceName" required></el-input>
      </el-form-item>
      <el-form-item label="设备数量">
        <el-input v-model="device.deviceNum" required></el-input>
      </el-form-item>
      <el-form-item label="使用状态">
        <el-switch
          v-model="device.isUsed"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="device.remark" required></el-input>
      </el-form-item>
      <el-form-item style="height: 0">
        <el-input type="hidden" v-model="device.id" autocomplete="off"></el-input>
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
    props: ['dialogVisible', 'device'],
    data() {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          deviceName: '',
          deviceNum: 0,
          isUsed: true,
          remark: null
        },
      }
    },
    methods: {
      onSave() {
        console.log(this.device)

        this.$axios
          .post('/device/merge',
            {
              "id": this.device.id,
              "deviceName": this.device.deviceName,
              "deviceNum": this.device.deviceNum,
              "isUsed": this.device.isUsed,
              "remark": this.device.remark
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
