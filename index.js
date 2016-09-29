process.env.CELL_MODE = process.env.CELL_MODE || '_development'
var Cell = require('./lib/cell')
var instance = new Cell()

instance.start(function (err) {
  if (err) throw err
  // # build the cell
  instance.plasma.emit({type: 'build', branch: 'plasma'}, function (err) {
    if (err) throw err
  })
})
