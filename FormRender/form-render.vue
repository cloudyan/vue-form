<script>
import { mapping, widgets } from './element-ui'
import getField from './base/get-field'

/**
 * format 指定渲染组件
 *
 * 默认组件为
 * string -> input
 *
 */

export default {
  name: 'FormRender',

  // name column schema formData widgets fieldUI fields mapping showDescIcon showValidate displayType onChange onValidate
  props: {
    propsSchema: {
      type: Object,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
  },

  computed: {
    list() {
      const { propsSchema } = this.$props
      console.log(propsSchema)

      const { properties } = propsSchema
      return Object.keys(properties).map(name => ({
        name,
        schema: properties[name],
      }))
    },
  },
  methods: {
    // getWidget(schema) {
    //   const widget = getWidgetName(schema, mapping)
    //   console.log(widget)
    //   return `v-${widget}`
    // },
  },

  render(h) {
    // https://github.com/vuejs/babel-plugin-transform-vue-jsx
    // widgets
    const { formData } = this
    const children = this.list.map(item => {
      const { Field } = getField(item.schema, { generated: widgets, mapping })

      return (<div>
        <div key="item.id">{ item.name + item.schema.title }</div>
        <Field formData={formData} />
      </div>)
    })
    return <div class="form-panel">{children}</div>
  },
}
</script>
