
const NAME = 'v-select'

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
    return <ElSelect {...ctx.data}>
    </ElSelect>
      // {ctx.props.options.map((props, index) => {
      //   return <div>{index}</div>
      //   const slot = props.slot ? toDefSlot(props.slot, h) : []

      //   return <ElOption {...{props}}
      //       key={NAME + index + ctx.props.unique}>{slot}</ElOption>
      // }).concat(ctx.chlidren)}
  },
}
