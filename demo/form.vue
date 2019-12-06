<template>
  <div class="demo-form">
    <h2>form</h2>
    <form-render
      :schema="schema"
      :formData="formData"
      @onChange="onChange"
      @onValidate="onValidate"
      class="form-t1"
    />
  </div>
</template>

<script>
// :propsSchema="propsSchema"
import FormRender from '../src/element-ui'
import SCHEMA from './json/demo1'

export default {
  name: 'page-form',
  components: {
    FormRender,
  },
  data() {
    return {
      // propsSchema: SCHEMA.propsSchema,
      schema: SCHEMA.propsSchema,
      formData: SCHEMA.formData || {
        string: '',
        select: '',
      },
    }
  },
  created() {
    console.log(this)

    setTimeout(() => {
      console.log(this)
    }, 1000)
  },
  methods: {
    onChange(formData) {},
    onValidate(valid) {
      console.log('没有通过的校验:', valid)
    },
  },
}
</script>

<style>

</style>
