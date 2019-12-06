# 设计

1. 读取 json schema 数据, 优化数据结构
2. 遍历解析数据, 如果是 Object, 则递归遍历
3. 渲染对应组件, 传入对应层级的 schema 数据以及对应层级的 value 数据

```js
{
  propsSchema: {
    numberDemo: {
      $id: '',
      type: 'number',
      title: '长度',
      description: '数字输入框',
      data: {}, // 组件数据
      options: { // 组件选/配置项
        min: 10,
        max: 100,
        step: 10
      },
      // style: {}, // 样式扩展
      rules: {}, // 不满足条件就显示
      value: {}, // 组件值
      formData: {}, // 表单值
      children: [],
    },
  },
  formData: {},
}
```
