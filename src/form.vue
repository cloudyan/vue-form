<template>
  <div class="demo-form">
    <h2>form 表单生成器</h2>
    <form-render
      :propsSchema="propsSchema"
      :formData="formData"
    />
  </div>
</template>

<script>
import FormRender from '../FormRender/form-render'
import SCHEMA from './json/simplest'

export default {
  name: 'PageForm',
  components: {
    FormRender,
  },
  data() {
    return {
      propsSchema: SCHEMA.propsSchema,
      formData: SCHEMA.formData || {},
    }
  },
}
</script>

<style>

</style>
