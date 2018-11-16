module.exports = store

function store (state, emitter) {
  state.verticals = [
    {x: 0, y: 0, length: 700},
    {x: 700-20, y: 0, length: 700},
  ]
  state.horizontals = [
    {x: 0, y: 0, length: 700},
    {x: 0, y: 700-20, length: 700},
  ]
  state.visible = false
  state.posY = 0
  state.length = 700

  emitter.on('DOMContentLoaded', function () {
    emitter.on('line:click', function () {
      if (!state.isVertical) {
        state.verticals.push({x: state.pos, y: state.start, length: state.length})
      } else {
        state.horizontals.push({x: state.start, y: state.pos, length: state.length})
      }
      state.visible = false
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverVertical', function ({x,y}) {
      // positioning horizontal line
      state.isVertical = true
      state.pos = y
      state.start = x
      state.length = state.verticals
        .filter(v => v.y <= y && y <= v.y + v.length && v.x >= x)
        .sort((a, b) => a.x - b.x)[0].x - x
      state.visible = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverHorizontal', function ({x,y}) {
      state.isVertical = false
      state.pos = x
      state.start = y
      const endPos = state.horizontals
        .filter(h => h.x <= x && x <= h.x + h.length && h.y >= y)
        .sort((a, b) => a.y - b.y)[0].y - y
      state.length = endPos
      state.visible = true
      emitter.emit(state.events.RENDER)
    })

    emitter.on('line:out', function () {
      state.visible = false
      emitter.emit(state.events.RENDER)
    })
  })
}
