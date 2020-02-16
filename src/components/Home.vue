<template>
  <div>
    <!--<nav-menu></nav-menu>-->
    <side-bar></side-bar>
    <!--<el-main>-->
      <!--<router-view/>-->
    <!--</el-main>-->
  </div>
</template>

<script>
  // import NavMenu from './common/NavMenu'
  import SideBar from "./common/SideBar";

  export default {
    name: 'Home',
    components: {SideBar}
  }
</script>

<style scoped>

</style>


