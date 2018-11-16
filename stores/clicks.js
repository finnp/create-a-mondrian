module.exports = store

function store (state, emitter) {
  state.visible = false
  state.posY = 0

  emitter.on('DOMContentLoaded', function () {
    emitter.on('line:hover', function (posY) {
      state.posY = posY
      state.visible = true
      emitter.emit(state.events.RENDER)
    })

    emitter.on('line:out', function () {
      state.visible = false
      emitter.emit(state.events.RENDER)
    })
  })
}
