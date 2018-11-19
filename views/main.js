var html = require('choo/html')

var TITLE = 'create a mondrian'

module.exports = view

const colors = [
  'red',
  'yellow',
  'blue',
  'white',
  'black'
]

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="code lh-copy">
    <div class="center" style="width:700px">
    <h1 class="f1 mt0 mb0">create a mondrian</h1>
    <svg style="border: 10px solid black;" version="1.1"
   baseProfile="full"
   width="${state.width}" height="${state.height}"
   xmlns="http://www.w3.org/2000/svg">

   ${
     state.rects.map((rect) => {
       if (rect === state.currentRect) return renderColorPicker(rect)
       return html`<rect onmousemove=${onHoverRectangle.bind(null, rect)} x=${rect.x} y=${rect.y} height=${rect.height} width=${rect.width}  fill="${getColor(rect.color)}"/>`
     })
   }

   ${state.visible && html`<line
     x1="${state.isVertical ? state.start : state.pos}"
     y1="${state.isVertical ? state.pos : state.start}"
     x2="${state.isVertical ? state.start + state.length : state.pos}"
     y2="${state.isVertical ? state.pos : state.start + state.length}"
     style="stroke:rgba(0,0,0,0.3);stroke-width:${state.lineWidth};"
    />`}

  ${state.horizontals.map(({x,y,length}) =>
     html`<line onclick=${onLineClick} onmouseout=${onLineOut} onmousemove=${onHoverHorizontal.bind(null,y)} x1="${x}" y1="${y}" x2="${x+length}" y2="${y}" style="stroke:black;stroke-width:${state.lineWidth};cursor: pointer;" />`
   )}

   ${state.verticals.map(({x,y,length}) =>
    html`<line onclick=${onLineClick} onmouseout=${onLineOut} onmousemove=${onHoverVertical.bind(null, x)} x1="${x}" y1="${y}" x2="${x}" y2="${y+length}" style="stroke:black;stroke-width:${state.lineWidth};cursor: pointer;" />`
  )}

   </svg>
   </div>
    </body>
  `

  function onLineClick () {
    emit('line:click')
  }

  function onHoverVertical (x, e) {
    const y = e.offsetY
    emit('line:hoverVertical', {x,y})
  }
  function onHoverHorizontal (y, e) {
    const x = e.offsetX
    emit('line:hoverHorizontal', {x,y})
  }

  function onHoverRectangle (rect) {
    emit('rect:hover', rect)
  }

  function onLineOut (e) {
    emit('line:out')
  }

  function onColorClick (color) {
    emit('rect:colorPick', color)
  }

  function onColorHover (color) {
    emit('rect:colorHover', color)
  }

  function getColor (colorName, a) {
    a = a || 1
    let r,g,b = 0
    if (colorName === 'red') {
      r = 238
      g = 21
      b = 31
    }
    if (colorName === 'yellow') {
      r = 255
      g = 243
      b = 0
    }
    if (colorName === 'blue') {
      r = 0
      g = 102
      b = 181
    }
    if (colorName === 'black') {
      r = 0
      g = 0
      b = 0
    }
    if (colorName === 'white') {
      r = 255
      g = 255
      b = 255
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  function renderColorPicker (rect) {
    const width = rect.width - state.lineWidth
    const height = rect.height - state.lineWidth
    const x = rect.x + state.lineWidth / 2
    const y = rect.y + state.lineWidth / 2
    return html`
     <g>
      ${colors.map((color,index) => html`<rect
        style="cursor:pointer;"
        onmousemove=${onColorHover.bind(null, color)}
        onclick=${onColorClick.bind(null, color)}
        x=${x + index * width/colors.length}
        y=${y}
        height=${height}
        width=${width/5}
        fill="${getColor(color, state.currentColor === color ? 1 : 0.5)}"/>`
      )}
     </g>
    `
  }
}
