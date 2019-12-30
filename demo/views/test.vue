<template>
  <div class="page-test">
    <test-a v-model="strs" />
    <test-b v-model="select" />
  </div>
</template>

<script>
import SCHEMA from '../json/demo1'
import { parse } from '../parser'
import { mapping, widgets } from '../../src/widgets/element-ui'

function render() {
  const settings = {
    vname: '$form',
    schema: SCHEMA.propsSchema,
    formData: {},
  }

  const fields = {}

  const materials = {
    generated: widgets,
    customized: fields,
    mapping,
  }
  const { props } = parse(settings, materials)
  // console.log(props)
}

render()

const TestA = {
  props: {
    value: {
      type: [Object, String],
      default: () => '',
    },
  },
  render(h) {
    return <div>{this.$props.value}</div>
  },
}

const TestB = {
  props: {
    value: {
      type: [Object, String],
      default: () => '',
    },
  },
  render(h) {
    return <div>{this.$props.value}</div>
  },

  created() {
    setTimeout(() => {
      this.value = '1'
    }, 2000)
  },
}

export default {
  components: {
    TestA,
    TestB,
  },

  data() {
    return {
      strs: '',
      select: '',
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
