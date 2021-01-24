<template>
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
   <el-menu-item>
      <span slot="title">IOT</span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/device">
      <i class="el-icon-setting"></i>
      <span slot="title">Device Manage</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: ['is-collapse'],
  data () {
    return {
      // isCollapse: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
