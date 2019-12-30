
import parse from './base/parser'
// import piping from './base/piping'
import RenderField from './base/render-field'

const noop = () => {}

// https://cn.vuejs.org/v2/guide/render-function.html
// 深入了解 context 参数

// 功能设计: 核心组件 使用传入的素材组件和数据, 遍历处理, 组装数据和组件 并渲染结果
// 遍历数据实现递归调用
// 将素材, 包装到 fields
// 遍历 schema
export default {
  name: 'form-render',
  functional: true,
  props: {
    vname: {
      type: String,
      default: '$form',
    },
    column: {
      type: Number,
      default: 1,
    },
    schema: {
      type: Object,
      default: {},
    },
    formData: {
      type: Object,
      default: {},
    },
    mapping: {
      type: Object,
      default: {},
    },
    widgets: {
      type: Object,
      default: {},
    },
    // piping: {
    //   type: Object,
    //   default: {},
    // },
    fields: {
      type: Object,
      default: {},
    },
    showDescIcon: Boolean,
    showValidate: {
      type: Boolean,
      default: true,
    },
    displayType: {
      type: String,
      default: 'column',
    },
    onChange: {
      type: Function,
      default: noop,
    },
  },
  render(h, ctx) {
    const {
      vname,
      schema,
      formData,
      fields: customized,
      mapping,
      widgets,
    } = ctx.props
    // 处理组件
    const generated = widgets

    return (
      <div class="vue-form-render">
        <RenderField
          settings={{
            vname,
            schema,
            formData,
          }}
          fields={{
            // 根据 Widget 生成的 Field
            generated,
            // 自定义的 Field
            customized,
            // 字段 type 与 widgetName 的映射关系
            mapping,
          }}
          // on={ctx.listeners}
        />
      </div>
    )
  },
}
