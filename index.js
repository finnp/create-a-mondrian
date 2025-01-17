var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo({href: false})
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./stores/clicks'))

app.route('/', require('./views/main'))
app.route('/*', require('./views/main'))

module.exports = app.mount('body')
