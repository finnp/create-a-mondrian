var html = require('choo/html')

var TITLE = 'create a mondrian'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  // TODO: replace with state.width etc.
  const width = 700
  const height = width
  const lineWidth = 20

  return html`
    <body class="code lh-copy">
    <svg class="db center" version="1.1"
   baseProfile="full"
   width="${width}" height="${height}"
   xmlns="http://www.w3.org/2000/svg">

   ${
     state.rects.map((rect) => {
       if (rect === state.currentRect) return renderColorPicker(rect)
       return html`<rect onmousemove=${onHoverRectangle.bind(null, rect)} x=${rect.x} y=${rect.y} height=${rect.height} width=${rect.width}  fill="white"/>`
     })
   }

   ${state.visible && html`<rect x="${state.isVertical ? state.start : state.pos}" y="${state.isVertical ? state.pos : state.start}" width="${state.isVertical ? state.length : lineWidth}" height="${state.isVertical ? lineWidth : state.length}" fill="rgba(0,0,0,0.3)" />`}

   ${rectsToVerticals(state.rects).map(({x,y,length}) =>
    html`<line style="cursor: pointer;" onclick=${onLineClick} onmouseout=${onLineOut} onmousemove=${onHoverVertical.bind(null, x)} x1="${x}" y1="${y}" x2="${x}" y2="${y+length}" style="stroke:black;stroke-width:20;" />`
  )}
   ${rectsToHorizontals(state.rects).map(({x,y,length}) =>
    html`<line style="cursor: pointer;" onclick=${onLineClick} onmouseout=${onLineOut} onmousemove=${onHoverHorizontal.bind(null,y)} x1="${x}" y1="${y}" x2="${x+length}" y2="${y}" style="stroke:black;stroke-width:20;" />`
  )}

   </svg>
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

  function renderColorPicker (rect) {
    return html`
     <g>
       <rect x=${rect.x} y=${rect.y} height=${rect.height} width=${rect.width/3}  fill="red"/>
       <rect x=${rect.x + rect.width/3} y=${rect.y} height=${rect.height} width=${rect.width/3}  fill="yellow"/>
       <rect x=${rect.x + 2*rect.width/3} y=${rect.y} height=${rect.height} width=${rect.width/3}  fill="blue"/>
     </g>
    `
  }
}
