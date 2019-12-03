
const NAME = 'v-input'

export default {
  name: NAME,
  functional: true,
  props: {
    // options: {
    //     type: Array,
    //     default: () => ([])
    // },
    // unique: {
    //     default: () => uniqueId()
    // },
  },
  render(h, ctx) {
    return <ElInput {...ctx.data} />
  },
}
