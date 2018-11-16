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


   ${state.visible && html`<rect x="0" y="${state.posY}" width="100%" height="${lineWidth}" fill="grey" />`}


   <rect onmouseout=${onLineOut} onmousemove=${onHoverLine} x="0" y="0" width="${lineWidth}" height="100%" fill="black" />
   <rect onmouseout=${onLineOut} onmousemove=${onHoverLine} x="${width-lineWidth}" y="0" width="${lineWidth}" height="100%" fill="black" />
   <rect onmouseout=${onLineOut} onmousemove=${onHoverLine} x="0" y="0" width="100%" height="${lineWidth}" fill="black" />
   <rect onmouseout=${onLineOut} onmousemove=${onHoverLine} x="0" y="${width-lineWidth}" width="100%" height="${lineWidth}" fill="black" />

   </svg>
    </body>
  `

  function onHoverLine (e) {
    const posY = e.offsetY
    emit('line:hover', posY)
  }

  function onLineOut (e) {
    emit('line:out')
  }
}
