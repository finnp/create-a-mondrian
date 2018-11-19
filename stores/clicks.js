module.exports = store

function store (state, emitter) {
  const width = state.width = 700
  const height = state.height = 700
  const lineWidth = state.lineWidth = 20

  state.rects = [{
    x: 0,
    y: 0,
    height: height,
    width: width,
    color: 'white'
  }]
  state.verticals = rectsToVerticals(state.rects)
  state.horizontals = rectsToHorizontals(state.rects)
  state.visible = false
  state.posY = 0
  state.length = 700

  emitter.on('DOMContentLoaded', function () {
    emitter.on('rect:hover', function (rect) {
      if (rect !== state.pauseRect) {
        state.currentRect = rect
        state.pauseRect = null
        emitter.emit(state.events.RENDER)
      }
    })
    emitter.on('rect:colorPick', function (color) {
      state.currentRect.color = color
      state.pauseRect = state.currentRect
      state.currentRect = null
      emitter.emit(state.events.RENDER)
    })
    emitter.on('rect:colorHover', function (color) {
      state.currentColor = color
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:click', function () {
      if (!state.isVertical) {
        const x = state.pos
        const y = state.start
        const possibleRects = state.rects.filter(rect => rect.y === y)
        const ignoredRects = state.rects.filter(rect => rect.y !== y)

        const rectsLeft = possibleRects.filter(rect => rect.x <= x)
        const rectsRight = possibleRects.filter(rect => rect.x > x)
        const rect = rectsLeft.sort((a,b) => a.x - b.x).pop()
        state.rects = ignoredRects
          .concat(rectsLeft)
          .concat(rectsRight)
          .concat(splitRectVertical(rect, state.pos))
        state.verticals = rectsToVerticals(state.rects)
      } else {
        const y = state.pos
        const x = state.start
        const possibleRects = state.rects.filter(rect => rect.x === x)
        const ignoredRects = state.rects.filter(rect => rect.x !== x)

        const rectsUp = possibleRects.filter(rect => rect.y <= y)
        const rectsDown = possibleRects.filter(rect => rect.y > y)
        const rect = rectsUp.sort((a,b) => a.y - b.y).pop()
        state.rects = ignoredRects
          .concat(rectsUp)
          .concat(rectsDown)
          .concat(splitRectHorizontal(rect, state.pos))
        state.horizontals = rectsToHorizontals(state.rects)
      }
      state.visible = false
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverVertical', function ({x,y}) {
      // positioning horizontal line
      state.isVertical = true
      state.currentRect = null
      state.pos = y
      state.start = x
      state.length = state.verticals
        .filter(v => v.y <= y && y <= v.y + v.length && v.x > x)
        .sort((a, b) => a.x - b.x)[0].x - x
      state.visible = true
      emitter.emit(state.events.RENDER)
    })
    emitter.on('line:hoverHorizontal', function ({x,y}) {
      // positioning vertical line
      state.isVertical = false
      state.currentRect = null
      state.pos = x
      state.start = y
      const endPos = state.horizontals
        .filter(h => h.x <= x && x <= h.x + h.length && h.y > y)
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

function splitRectVertical (rect, x) {
  const posX = x - rect.x
  return [
    {x: rect.x, y: rect.y, width: posX, height: rect.height, color: rect.color},
    {x: rect.x + posX, y: rect.y, width: rect.width - posX, height: rect.height, color: rect.color === 'black' ? 'white' : rect.color}
  ]
}

function splitRectHorizontal (rect, y) {
  const posY = y - rect.y
  return [
    {x: rect.x, y: rect.y, height: posY, width: rect.width, color: rect.color},
    {x: rect.x, y: rect.y + posY, height: rect.height - posY, width: rect.width, color: rect.color === 'black' ? 'white' : rect.color}
  ]
}

function rectsToVerticals (rects) {
  return rects
    .map(rect => ([
      {x: rect.x, y: rect.y, length: rect.height},
      {x: rect.x + rect.width, y: rect.y, length: rect.height},
    ]))
    .reduce((a, b) => a.concat(b))
}

function rectsToHorizontals (rects) {
  return rects
    .map(rect => ([
      {x: rect.x, y: rect.y, length: rect.width},
      {x: rect.x, y: rect.y + rect.height, length: rect.width},
    ]))
    .reduce((a, b) => a.concat(b))
}
