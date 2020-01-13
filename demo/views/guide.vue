<template>
  <div class="page-routes">
    <div :key="item.path" v-for="item in routes" class="link">
      <a :href="item.path">
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return [
        {
          path: '/test',
          name: '测试',
        },
        {
          path: '/form',
          name: '表单',
        },
      ]
    },
  },
  created() {

  },
}
</script>

<style scoped>
.link {
  padding: 10px 30px;
}
</style>
