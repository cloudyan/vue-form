import { parse, getSubSchemas } from './parser'
import RenderField from './render-field'
import getField from './get-field'

export default {
  name: 'render-field',
  functional: true,
  render(h, ctx) {
    // 获取数据 及 素材
    const {
      settings = {},
      fields,
    } = ctx.props
    let { schema, formData } = settings

    // 解析数据
    const { Field, props } = parse(settings, fields)

    if (!Field) return null

    if (schema.type === 'object') {
      const { properties = [] } = schema

      console.log(Object.keys(properties))

      const nodes = Object.keys(properties).map(name => {
        const current = properties[name]
        const data = ['object', 'array'].includes(current.type) ? formData[name] : formData

        const subSetting = {
          vname: name,
          formData: data,
          schema: current,
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
      <div class="fr-field" style="margin-top: 10px;">
        <div class="fr-label">{props.vname}: {props.schema.title}</div>
        <div>{props.schema.description}</div>
        <Field
          // isRoot
          {...props}
          vname={props.vname}
          schema={props.schema}
          formData={props.formData}
        />
      </div>
    )
  },
}
