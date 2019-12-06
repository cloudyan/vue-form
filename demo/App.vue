<template>
  <div id="app">
    <keep-alive :include="keepAlives" :max="30">
      <router-view class="page-view" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',

  components: {
  },
  data() {
    return {
      keepAlives: [],
    }
  },
}
</script>

<style lang="stylus">

</style>
