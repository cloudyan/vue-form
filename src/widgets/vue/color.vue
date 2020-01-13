<template>
  <el-color-picker
    v-model="value"
    v-bind="schema.options"
    class="d-color"
  />
</template>

<script>
import { ColorPicker } from 'element-ui'
import { mixinCommon } from '../../common/utils'

export default {
  components: {
    [ColorPicker.name]: ColorPicker,
  },
  mixins: [
    mixinCommon,
  ],
}
</script>
