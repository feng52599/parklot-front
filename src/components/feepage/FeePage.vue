<template>
  <div>
    <div>
      请付款：
    </div>
    <div>
      <el-image
        style="width: 100px; height: 100px"
        :src="require('@/assets/img/QRCode.jpg')"
        fit="fill"></el-image>
    </div>
  </div>
</template>

<script>

  import echarts from 'echarts'

  export default {
    name: "FeePage.vue",
    data() {
      /*
        tableDataBegin 初始值
        tableDataend 最终使用的值
       */
      return {
        // fits: ['fill'],
        // url: '@/assets/img/QRCode.jpg'
      };
    },

    methods: {}
  }
</script>
<style>

</style>
