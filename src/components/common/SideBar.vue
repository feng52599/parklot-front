<template>
  <el-row class="tac">
    <el-col :span="12">
      <!--<h5>默认颜色</h5>-->
      <el-menu
        default-active="$route.path"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/index">
          <template slot="title">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/parking">
          <i class="el-icon-camera-solid"></i>
          <span slot="title">停车管理</span>
        </el-menu-item>
        <el-menu-item index="/fee">
          <i class="el-icon-money"></i>
          <span slot="title">收费管理</span>
        </el-menu-item>
        <el-menu-item index="/feepage">
          <i class="el-icon-wallet"></i>
          <span slot="title">收费页面</span>
        </el-menu-item>
        <el-menu-item index="/parkingrecord">
          <i class="el-icon-document"></i>
          <span slot="title">停车记录</span>
        </el-menu-item>
        <el-menu-item index="/clientuser">
          <i class="el-icon-user"></i>
          <span slot="title">协议客户</span>
        </el-menu-item>
        <el-menu-item index="/device">
          <i class="el-icon-setting"></i>
          <span slot="title">设备维护</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-card>
      <router-view></router-view>
    </el-card>
  </el-row>
</template>

<script>
  export default {
    name: "SideBar",
    data() {
      return {};
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goTo(path) {
        this.$router.replace(path);
      }
    }
  };
</script>

<style scoped>
  .el-col-12 {
    width: 15%;
  }
</style>

