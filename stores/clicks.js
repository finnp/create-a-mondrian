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

  emitter.on('DOMContentLoaded', function () {
    emitter.on('line:hoverVertical', function (posY) {
      state.isVertical = true
      state.pos = posY
      state.visible = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverHorizontal', function (posX) {
      state.isVertical = false
      state.pos = posX
      state.visible = true
      emitter.emit(state.events.RENDER)
    })

    emitter.on('line:out', function () {
      state.visible = false
      emitter.emit(state.events.RENDER)
    })
  })
}
