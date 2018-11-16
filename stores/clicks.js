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
        state.verticals.push({x: state.pos, y: 0, length: state.length})
      } else {
        state.horizontals.push({x: 0, y: state.pos, length: state.length})
      }
      state.visible = false
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverVertical', function (posY) {
      // positioning horizontal line
      state.isVertical = true
      state.pos = posY
      state.length = state.verticals
        .filter(v => v.y <= posY && posY <= v.y + v.length)
        .sort((a, b) => a.x - b.x)[1].x
      state.visible = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverHorizontal', function (posX) {
      state.isVertical = false
      state.pos = posX
      const endPos = state.horizontals
        .filter(h => h.x <= posX && posX <= h.x + h.length)
        .sort((a, b) => a.y - b.y)[1].y
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
