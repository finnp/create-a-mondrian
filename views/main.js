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
       return html`<rect onmousemove=${onHoverRectangle.bind(null, rect)} x=${rect.x} y=${rect.y} height=${rect.height} width=${rect.width}  fill="${getHexForColor(rect.color)}"/>`
     })
   }

   ${state.visible && html`<line
     x1="${state.isVertical ? state.start : state.pos}"
     y1="${state.isVertical ? state.pos : state.start}"
     x2="${state.isVertical ? state.start + state.length : state.pos}"
     y2="${state.isVertical ? state.pos : state.start + state.length}"
     style="stroke:rgba(0,0,0,0.3);stroke-width:20;"
    />`}

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

  function onColorClick (color) {
    emit('rect:colorPick', color)
  }

  function getHexForColor (colorName) {
    if (colorName === 'red') return 'rgba(238, 21, 31, 1)'
    if (colorName === 'yellow') return 'rgba(255, 243, 0, 1)'
    if (colorName === 'blue') return 'rgba(0, 102, 181, 1)'
    return colorName
  }

  function renderColorPicker (rect) {
    return html`
     <g>
       <rect onclick=${onColorClick.bind(null, 'red')} x=${rect.x} y=${rect.y} height=${rect.height} width=${rect.width/5} fill="rgba(238, 21, 31, 0.5)"/>
       <rect onclick=${onColorClick.bind(null, 'yellow')} x=${rect.x + rect.width/5} y=${rect.y} height=${rect.height} width=${rect.width/5}  fill="rgba(255, 243, 0,0.5)"/>
       <rect onclick=${onColorClick.bind(null, 'blue')} x=${rect.x + 2*rect.width/5} y=${rect.y} height=${rect.height} width=${rect.width/5}  fill="rgba(0, 102, 181,0.5)"/>
       <rect onclick=${onColorClick.bind(null, 'white')} x=${rect.x + 3*rect.width/5} y=${rect.y} height=${rect.height} width=${rect.width/5}  fill="rgba(255,255,255,0.5)"/>
       <rect onclick=${onColorClick.bind(null, 'black')} x=${rect.x + 4*rect.width/5} y=${rect.y} height=${rect.height} width=${rect.width/5}  fill="rgba(0,0,0,0.5)"/>
     </g>
    `
  }
}
