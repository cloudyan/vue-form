// https://cn.vuejs.org/v2/guide/render-function.html
// vname schema formData
// options => displayType required disabled readonly
// widgets fields
// rootValue value options
export default {
  name: 'fr-input',
  // functional: true,
  props: {
    vname: String,
    schema: Object,
    formData: Object,
  },
  render(h) {
    // const {
    //   vname,
    //   schema = {},
    //   formData = {},
    // } = this.$props

    return (
      <el-input
        // type="input"
        v-model={this.formData[this.vname]}
        {...this.schema.options}
      />
    )
  },
}
