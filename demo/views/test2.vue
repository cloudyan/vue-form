<script>
import SCHEMA from '../json/demo1'
// import { parse } from '../parser'
import getField from '../../src/base/get-field'
import { mapping, widgets } from '../../src/widgets/element-ui'

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

// 对于数组或对象类型，获取其子集schema
function getSubSchemas(schema = {}) {
  const {
    // object subset
    properties,
    // array subset
    items,
    // as subset's parent
    ...$parent
  } = schema
  const { type } = $parent
  // no subset
  if (!properties && !items) {
    return []
  }
  let children = {}
  if (type === 'object') {
    children = properties
  }
  if (type === 'array') {
    children = [].concat(items)
  }
  return Object.keys(children).map(vname => ({
    vname,
    schema: children[vname],
    // parent propsSchema
    $parent,
  }))
}

function getBasicProps(settings, materials) {
  const {
    schema,
    vname = '',
    $parent = {},
    formData,
  } = settings
  const { required = [] } = $parent
  const { generated, customized } = materials

  // 标准化属性模型
  // 除了value和onChange为动态值这里不处理
  let basicProps = {
    vname,
    schema,
    formData,
  }

  // 子集的属性
  const subItems = {}
  const subSchemas = getSubSchemas(schema)

  subSchemas.forEach(subSchema => {
    const { vname: _vname, schema: _schema = {} } = subSchema
    subItems[_vname] = {
      field: getField(_schema, materials).Field,
      props: getBasicProps(
        {
          ...subSchema,
          formData,
        },
        materials
      ),
    }
  })

  // if (['array', 'object'].indexOf(schema.type) >= 0) {}

  return basicProps
}

function parse(settings = {}, materials) {
  const { schema = {} } = settings
  return {
    field: getField(schema, materials).Field,
    props: getBasicProps(settings, materials),
  }
}

export default {
  components: {
    TestA,
    TestB,
  },

  data() {
    return {
      schema: SCHEMA.propsSchema,
      formData: {
        string: '123',
        select: 1,
      },
    }
  },

  render(h) {
    const { schema } = this

    const settings = {
      vname: '$form',
      schema,
      formData: this.formData,
    }

    const materials = {
      generated: widgets,
      customized: {},
      mapping,
    }

    const { field, props } = parse(settings, materials)

    if (!field) return null

    return (
      <div class="fr-field">
        <div class="fr-label">{props.vname}: {props.schema.title}</div>
        <field
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
</script>

<style lang="stylus" scoped>

</style>
