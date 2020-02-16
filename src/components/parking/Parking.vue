<template>
  <div>
    <el-card class="box-card-1">
      <div class="begindiv">
        <el-upload
          class="img-upload"
          ref="upload"
          action="http://localhost:8443/api/parking/begin"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleSuccess"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击入库</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <div class="enddiv">
        <el-upload
          class="img-upload"
          ref="endUpload"
          action="http://localhost:8443/api/parking/end"
          :on-preview="handlePreview1"
          :on-remove="handleRemove1"
          :before-remove="beforeRemove1"
          :on-success="handleSuccess1"
          multiple
          :limit="1"
          :on-exceed="handleExceed1"
          :file-list="fileList">
          <el-button size="small" type="primary">点击出库</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-input
        type="textarea"
        :rows="10"
        placeholder=""
        v-model="textarea">
      </el-input>
    </el-card>

  </div>
</template>


<script>
  import axios from "axios";
  import {Toast} from "vant";
  // "access_token":"24.de607104ea4f86d8908ac291dddc6978.2592000.1584238589.282335-18468375"
  export default {
    name: "Parking.vue",
    data() {
      return {
        fileList: [],
        url: '',
        textarea: '',
      }
    },
    methods: {
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess(response) {
        this.url = response
        console.log(response)
        this.textarea = "车辆" + response + "  欢迎光临！"
        this.$message.warning('入库成功')
      },
      clear() {
        this.$refs.upload.clearFiles()
      },

      handleRemove1(file, fileList) {
      },
      handlePreview1(file) {
      },
      handleExceed1(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove1(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess1(response) {
        this.url = response
        console.log(response);
        this.textarea = "车辆" + response + "  欢迎下次光临！"
        this.$message.warning('出库成功')
      },
    }
  }

</script>

<style>
  .begindiv {
    margin-bottom: 50px;
  }

  .enddiv {
    margin-bottom: 50px;
  }

  .box-card-1 {
    margin-bottom: 20px;

  }
</style>
