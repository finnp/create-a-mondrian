var html = require('choo/html')

var TITLE = 'create-a-mondrian - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  const width = 700
  const height = width

  const lineWidth = 20


  return html`
    <body class="code lh-copy">
    <div onclick=${onclick}>test</div>
    <svg version="1.1"
   baseProfile="full"
   width="${width}" height="${height}"
   xmlns="http://www.w3.org/2000/svg">


   ${state.visible && html`<rect x="${state.isVertical ? 0 : state.pos}" y="${state.isVertical ? state.pos : 0}" width="${state.isVertical ? state.length : lineWidth}" height="${state.isVertical ? lineWidth : state.length}" fill="grey" />`}

   ${state.verticals.map(({x,y,length}) =>
    html`<rect style="cursor: pointer;" onclick=${onLineClick} onmouseout=${onLineOut} onmousemove=${onHoverVertical} x="${x}" y="${y}" width="${lineWidth}" height="${length}" fill="black" />`
  )}
   ${state.horizontals.map(({x,y,length}) =>
    html`<rect style="cursor: pointer;" onclick=${onLineClick} onmouseout=${onLineOut} onmousemove=${onHoverHorizontal} x="${x}" y="${y}" width="${length}" height="${lineWidth}" fill="black" />`
  )}

   </svg>
    </body>
  `

  function onLineClick () {
    emit('line:click')
  }

  function onHoverVertical (e) {
    const posY = e.offsetY
    emit('line:hoverVertical', posY)
  }
  function onHoverHorizontal (e) {
    const posX = e.offsetX
    emit('line:hoverHorizontal', posX)
  }

  function onLineOut (e) {
    emit('line:out')
  }
}
