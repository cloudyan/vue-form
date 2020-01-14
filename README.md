# vue-form-render

受 [form-render](https://github.com/alibaba/form-render) 影响实现

输入 json-schema 自动渲染布局

## 功能支持

- [x] 支持输入 json-schema(控制布局) 和 formData(控制数据) 自动渲染界面
  - [ ] 如果不选 widget 只是使用默认原生 html 标签渲染
- [x] 支持输出 schema 和 formData
- [x] 支持生成代码(其实是固定的)
- [x] 支持横向/纵向排列 多列排版
- [x] 支持简单嵌套
- [ ] 支持条件关联判断, 使用表达式
  - [x] auto-render 子组件 Widget 的 change 修改, 返回修改后的 formData
  - [x] 函数或表达式支持 接收两个参数 (formData, rootValue)
- [ ] 支持约束验证(必填 格式校验等)
- [ ] 支持填充默认数据格式, (保持数据类型不变, 无数据时 formData 内显示空值而不是 不存在 当前 key)
- [ ] 丰富组件数
- [ ] 复杂嵌套结构
- [ ] 级联控制, 如省市联动 或依赖显示
- [ ] 支持关联远程数据
- [ ] 性能优化

## 用法

```vue
<template>
  <FormRender
    :schema="schema.propsSchema"
    :formData="schema.formData"
    @change="changeSchema"
  />
</template>


<script>
import FormRender from '@dwdjs/form-render'

export default {
  components: {
    FormRender,
  },

  data() {
    return {
      schema: {
        propsSchema: {},
        formData: {},
      },
    }
  },

  methods: {
    changeSchema(val) {
      this.schema.formData = val
    },
  },
}
</script>
```


## 第一步了解 JSON Schema

JSON Schema 里的字段可以描述表单的标题、描述、类型、必须项、自定义正则校验等信息。

- [Understanding JSON Schema](https://json-schema.org/understanding-json-schema/)
- https://json-schema.org/learn/
- https://json-schema.org/implementations.html#generators-from-schemas

## 实现 vue-form-render

使用 JSX 编程实现

- [form-render](https://github.com/alibaba/form-render)
- [form-create](https://github.com/xaboy/form-create)

vue 的 jsx 组装对函数的支持没有 react 灵活
