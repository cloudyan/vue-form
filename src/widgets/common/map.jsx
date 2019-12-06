export default {
  name: 'fr-map',
  functional: true,
  render(h, ctx) {
    return (
      <div class="flex flex-wrap fr-map">
        {ctx.children}
      </div>
    )
  },
}
