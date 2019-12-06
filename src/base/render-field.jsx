import parse from './parser'
import RenderField from './render-field'

// 功能 基本组件包装 组装数据和组件
// 配置 settings
// 匹配约束(材料) fields
export default {
  name: 'render-field',
  functional: true,
  render(h, ctx) {
    // 获取数据 及 素材
    const {
      settings = {},
      fields,
    } = ctx.props
    const { schema, formData } = settings

    // 解析数据
    const { Field, props } = parse(settings, fields)

    props.disabled = true
    console.log('props', props)
    // name value schema formData options
    // displayType required disabled readonly
    // fields widgets

    if (!Field) return null

    if (schema.type === 'object') {
      const { properties = [] } = schema
      const nodes = Object.keys(properties).map(name => {
        const subSetting = {
          vname: name,
          formData,
          schema: properties[name],
        }
        // console.log('subSetting', subSetting)
        return (
          <RenderField
            settings={subSetting}
            fields={fields}
          />
        )
      })
      return <Field>{nodes}</Field>
    }

    // props 包含组件需要的数据
    // - schema 当前的结构数据(包含 ui 配置)
    // - value 当前组件的值
    // - formData 全部数据
    return (
      <div class="fr-field">
        <div class="fr-label">{props.schema.title}</div>
        <Field
          isRoot
          {...props}
          vname={props.vname}
          schema={props.schema}
          formData={props.formData}
        />
      </div>
    )
  },
}
